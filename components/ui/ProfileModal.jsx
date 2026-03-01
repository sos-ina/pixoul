"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { authAPI, profileAPI } from "@/lib/api/experiences";
import AvatarUpload from "@/components/AvatarUpload";

export default function ProfileModal({ isOpen, onClose, onLoggedOut }) {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    displayName: "",
    country: "",
    dateOfBirth: "",
    bio: "",
    avatarUrl: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const load = async () => {
      setStatus({ type: "idle", message: "" });
      setIsLoading(true);

      try {
        const me = await authAPI.getCurrentUser();
        if (cancelled) return;

        const u = me?.user;
        setUser(u || null);
        setForm({
          displayName: u?.display_name || "",
          country: u?.country || "",
          dateOfBirth: u?.date_of_birth || "",
          bio: u?.bio || "",
          avatarUrl: u?.avatar_url || "",
        });
      } catch (err) {
        if (!cancelled) setStatus({ type: "error", message: err?.message || "Failed to load profile" });
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const saveChanges = async () => {
    setStatus({ type: "idle", message: "" });
    setIsLoading(true);

    try {
      const result = await profileAPI.update({
        displayName: form.displayName,
        country: form.country,
        dateOfBirth: form.dateOfBirth,
        bio: form.bio,
        avatarUrl: form.avatarUrl,
      });

      setUser(result?.user || user);
      setStatus({ type: "ok", message: "Saved" });
      window.dispatchEvent(new Event("auth:changed"));
    } catch (err) {
      setStatus({ type: "error", message: err?.message || "Failed to save" });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem("auth_token");
    window.dispatchEvent(new Event("auth:changed"));
    onLoggedOut?.();
    onClose?.();
  };

  return createPortal(
    <div className="fixed inset-0 z-[40] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#111] border border-[#38C2D9]/30 rounded-none p-8 md:p-12 shadow-2xl text-white">
        <div className="mb-8">
          <h2 className="text-3xl font-black italic uppercase">
            Profile <span className="text-[#38C2D9]">Settings</span>
          </h2>
          <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mt-2">
            Update your Pixoul profile
          </p>
        </div>

        {isLoading ? (
          <div className="text-sm text-white/60">Loading...</div>
        ) : null}

        {status.type === "error" ? (
          <div className="mb-4 text-sm text-pink-400">{status.message}</div>
        ) : null}
        {status.type === "ok" ? (
          <div className="mb-4 text-sm text-[#38C2D9]">{status.message}</div>
        ) : null}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                Email
              </label>
              <input
                value={user?.email || ""}
                readOnly
                className="bg-black/50 border border-white/10 rounded-none p-4 text-white/70 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                Username
              </label>
              <input
                value={user?.username || ""}
                readOnly
                className="bg-black/50 border border-white/10 rounded-none p-4 text-white/70 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <img
              src={form.avatarUrl || "/logos/profile.png"}
              alt="avatar"
              className="w-[100px] h-[100px] object-cover border border-[#38C2D9]/50 rounded-none bg-black/40"
            />

            <div className="flex-1">
              <AvatarUpload
                userId={user?.user_id}
                onUploadSuccess={(url) => setForm((p) => ({ ...p, avatarUrl: url }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                Display Name
              </label>
              <input
                value={form.displayName}
                onChange={(e) => setForm((p) => ({ ...p, displayName: e.target.value }))}
                className="bg-black/50 border border-white/10 rounded-none p-4 focus:border-[#38C2D9] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                Country
              </label>
              <input
                value={form.country}
                onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                className="bg-black/50 border border-white/10 rounded-none p-4 focus:border-[#38C2D9] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                Date of Birth
              </label>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => setForm((p) => ({ ...p, dateOfBirth: e.target.value }))}
                className="bg-black/50 border border-white/10 rounded-none p-4 focus:border-[#38C2D9] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                className="bg-black/50 border border-white/10 rounded-none p-4 h-28 focus:border-[#38C2D9] outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={saveChanges}
              disabled={isLoading}
              className="flex-1 bg-[#38C2D9] text-black font-black py-4 rounded-none hover:scale-[1.02] transition-transform disabled:opacity-60"
            >
              Save Changes
            </button>
            <button
              onClick={logout}
              className="px-8 border border-[#ff006e]/40 text-[#ff006e] rounded-none font-bold text-sm hover:bg-[#ff006e]/10 hover:border-[#ff006e]/70 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
