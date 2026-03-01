"use client";
import { useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { profileAPI } from "@/lib/api/experiences";

export default function AvatarUpload({ userId, onUploadSuccess }) {
  const supabase = useMemo(() => createClient(), []);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    setError("");
    setSuccess("");

    if (!file) return;

    if (!file.type?.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    if (!userId) {
      setError("Missing user id");
      return;
    }

    setIsUploading(true);

    try {
      const ext = (file.name?.split(".").pop() || "png").toLowerCase();
      const filename = `user-${userId}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("Avator")
        .upload(filename, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage.from("Avator").getPublicUrl(filename);
      const avatarUrl = publicData?.publicUrl;

      if (!avatarUrl) {
        throw new Error("Failed to generate public URL");
      }

      const result = await profileAPI.uploadAvatar(avatarUrl);

      setSuccess("Avatar uploaded successfully");
      onUploadSuccess?.(result?.avatarUrl || avatarUrl);
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="mt-4">
      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-2 block">
        Avatar
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="w-full bg-black/40 border border-white/10 rounded-none p-4 text-white focus:border-[#38C2D9] outline-none transition-all"
      />

      {isUploading ? (
        <div className="mt-2 text-xs text-white/50">Uploading...</div>
      ) : null}
      {error ? <div className="mt-2 text-xs text-pink-400">{error}</div> : null}
      {success ? <div className="mt-2 text-xs text-[#38C2D9]">{success}</div> : null}
    </div>
  );
}
