import { useRef, useState } from "react";
import { User as UserService } from "../entities/User";

interface AvatarSectionProps {
  profile: any;
  onUpdate: () => void;
  showMessage: (type: "success" | "error", text: string) => void;
}

export default function AvatarSection({ profile, onUpdate, showMessage }: AvatarSectionProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSizeMB = 1;
  
    // Type check
    if (!allowedTypes.includes(file.type)) {
      showMessage("error", "Only JPEG, JPG, PNG, or WEBP files are allowed.");
      return;
    }

    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > maxSizeMB) {
      showMessage("error", "File is too large. Max 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setPreview(base64);

      try {
        await UserService.updateAvatar(base64);
        await onUpdate();
        showMessage("success", "Avatar updated successfully.");
      } catch {
        showMessage("error", "Failed to update avatar.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    try {
      await UserService.updateAvatar("");
      setPreview(null);
      await onUpdate();
      showMessage("success", "Avatar removed.");
    } catch {
      showMessage("error", "Failed to remove avatar.");
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Avatar</h2>
      <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col items-center gap-2">
          <div className="relative cursor-pointer" onClick={handleAvatarClick}>
            <img
              src={preview || profile.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.username}`}
              alt="avatar"
              className="w-24 h-24 rounded-full border border-gray-600"
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
              />
            <div className="absolute bottom-1 right-1">
              <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Edit</span>
            </div>
          </div>
          {profile.avatar && (
            <button onClick={handleRemoveAvatar} className="text-xs text-red-400 hover:text-red-300">
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
    </div>
  );
}
