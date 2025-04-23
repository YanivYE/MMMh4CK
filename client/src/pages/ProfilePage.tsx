import { useEffect, useState, useRef } from "react";
import validator from "validator";
import { User as UserService } from "../entities/User";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";

export default function ProfilePage() {
  const { refreshUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProfile = async () => {
    try {
      const data = await UserService.me();
      setProfile(data);
      setFormData((prev) => ({
        ...prev,
        username: data.username || "",
        email: data.email || ""
      }));
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setPreview(base64);

      try {
        await UserService.updateAvatar(base64);
        await fetchProfile();
        await refreshUser();
        showMessage("success", "Avatar updated successfully.");
      } catch (err) {
        showMessage("error", "Failed to update avatar.");
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    try {
      await UserService.updateAvatar("");
      setPreview(null);
      await fetchProfile();
      await refreshUser();
      showMessage("success", "Avatar removed.");
    } catch (err) {
      showMessage("error", "Failed to remove avatar.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!validator.isEmail(formData.email)) {
        showMessage("error", "Please enter a valid email address.");
        return;
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      showMessage("error", "New passwords do not match.");
      return;
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined
      };

      await UserService.updateProfile(payload);
      await fetchProfile();
      await refreshUser();
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
      showMessage("success", "Profile updated successfully.");
    } catch (err: any) {
      showMessage("error", err.response?.data?.message || "Failed to update profile.");
    }
  };

  if (!profile) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">My Profile</h1>

      {/* Feedback Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded text-sm font-medium border transition-all duration-300 ${
            message.type === "success"
              ? "bg-green-900/20 text-green-400 border-green-700"
              : "bg-red-900/20 text-red-400 border-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Avatar Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex items-center gap-6 flex-wrap sm:flex-nowrap mb-6">
        <div className="flex flex-col items-center gap-2">
          <div className="relative cursor-pointer" onClick={handleAvatarClick}>
            <img
              src={
                preview ||
                profile.avatar ||
                `https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.username}`
              }
              alt="avatar"
              className="w-24 h-24 rounded-full border border-gray-600"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />
            <div className="absolute bottom-1 right-1">
              <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                Edit
              </span>
            </div>
          </div>

          {profile.avatar && (
            <button
              onClick={handleRemoveAvatar}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Remove avatar
            </button>
          )}
        </div>

        <div>
          <p className="text-white text-xl font-semibold">{profile.username}</p>
          <p className="text-gray-400 text-sm">{profile.email}</p>
          <p className="text-yellow-400 mt-2 font-bold">{profile.score} points</p>
        </div>
      </div>

      {/* Section 1: Account Info */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Account Info</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
          <Button onClick={handleSaveChanges} className="w-full mt-4">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Section 2: Change Password */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Current Password</label>
            <Input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Current Password"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">New Password</label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="New Password"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm New Password"
            />
          </div>
          <Button onClick={handleSaveChanges} className="w-full mt-4">
            Save Password
          </Button>
        </div>
      </div>
    </div>
  );
}
