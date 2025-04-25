import { useEffect, useState } from "react";
import validator from "validator";
import { User as UserService } from "../entities/User";
import { Submission as SubmissionService, Submission } from "../entities/Submission";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import PasswordStrength from "../components/PasswordStrength";
import { isPasswordStrong } from "../utils/validatePassword";
import { parseErrorMessage } from "../utils/parseErrorMessage";
import SubmissionHistory from "../components/statistics/SubmissionHistory";
import AvatarSection from "../components/AvatarSection";

export default function ProfilePage() {
  const { refreshUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<"avatar" | "account" | "password" | "history">("avatar");
  const [history, setHistory] = useState<Submission[]>([]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

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
    SubmissionService.listByCurrentUser()
      .then(setHistory)
      .catch((err) => console.error("Failed to load submissions", err));
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountUpdate = async () => {
    const hasProfileChanges =
      formData.username !== profile.username ||
      formData.email !== profile.email;
  
    if (!hasProfileChanges) {
      showMessage("error", "No account changes detected.");
      return;
    }
  
    if (!validator.isEmail(formData.email)) {
      showMessage("error", "Please enter a valid email address.");
      return;
    }
  
    try {
      await UserService.updateProfile({
        username: formData.username,
        email: formData.email
      });
      await fetchProfile();
      await refreshUser();
      showMessage("success", "Account info updated successfully.");
    } catch (err: any) {
        showMessage("error", parseErrorMessage(err));
    }
  };
  
  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;
  
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage("error", "Please fill in all password fields.");
      return;
    }

    if (!isPasswordStrong(formData.newPassword)) {
        showMessage("error", "New password is too weak.");
        return;
      }
  
    if (newPassword !== confirmPassword) {
      showMessage("error", "New passwords do not match.");
      return;
    }
  
    try {
      await UserService.updateProfile({
        currentPassword,
        newPassword
      });
      await fetchProfile();
      await refreshUser();
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
      showMessage("success", "Password updated successfully.");
    } catch (err: any) {
      showMessage("error", parseErrorMessage(err));
    }
  };
  

  if (!profile) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="md:w-64 bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-2 h-fit">
        <button onClick={() => setActiveSection("avatar")} className={`block w-full text-left px-4 py-2 rounded-md font-medium ${activeSection === "avatar" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}>
          Avatar
        </button>
        <button onClick={() => setActiveSection("account")} className={`block w-full text-left px-4 py-2 rounded-md font-medium ${activeSection === "account" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}>
          Account Info
        </button>
        <button onClick={() => setActiveSection("password")} className={`block w-full text-left px-4 py-2 rounded-md font-medium ${activeSection === "password" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}>
          Change Password
        </button>
        <button onClick={() => setActiveSection("history")} className={`block w-full text-left px-4 py-2 rounded-md font-medium ${activeSection === "history" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}>
          Submission History
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 space-y-8">
        {message && (
          <div className={`p-4 rounded text-sm font-medium border ${message.type === "success" ? "bg-green-900/20 text-green-400 border-green-700" : "bg-red-900/20 text-red-400 border-red-700"}`}>
            {message.text}
          </div>
        )}

        {activeSection === "avatar" && (
          <AvatarSection profile={profile} onUpdate={fetchProfile} showMessage={showMessage} />
        )}

        {activeSection === "account" && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Account Info</h2>
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm text-gray-400 mb-1">Username</label>
                    <Input
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        className="w-full"
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
                        className="w-full"
                    />
                    </div>
                    <Button onClick={handleAccountUpdate} className="w-full mt-2">
                    Save Changes
                    </Button>
                </div>
            </div>
        )}

        {activeSection === "password" && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Change Password</h2>
                    <div className="space-y-4">
                        <div>
                        <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                        <Input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Current Password"
                            className="w-full"
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
                                    className="w-full"
                                />
                                <PasswordStrength password={formData.newPassword} />
                            </div>
                        <div>
                        <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm New Password"
                            className="w-full"
                        />
                        </div>
                        <Button onClick={handlePasswordUpdate} className="w-full mt-2">
                        Save Password
                        </Button>
                    </div>
            </div>
        )}

        {activeSection === "history" && <SubmissionHistory history={history} />}
      </div>
    </div>
  );
}
