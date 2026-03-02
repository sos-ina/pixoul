"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { authAPI, profileAPI } from '@/lib/api/experiences';
import { useRouter } from 'next/navigation';



export default function SettingsPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    displayName: '',
    country: '',
    dateOfBirth: '',
    bio: '',
    avatarUrl: '',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setStatus({ type: 'idle', message: '' });

      try {
        const me = await authAPI.getCurrentUser();
        if (cancelled) return;

        const u = me?.user;
        setUser(u || null);
        setForm({
          displayName: u?.display_name || '',
          country: u?.country || '',
          dateOfBirth: u?.date_of_birth || '',
          bio: u?.bio || '',
          avatarUrl: u?.avatar_url || '',
        });
      } catch (err) {
        try {
          const msg = String(err?.message || '');
          if (msg.toLowerCase().includes('unauthorized')) {
            const { data } = await supabase.auth.getSession();
            const token = data?.session?.access_token;
            if (token) {
              localStorage.setItem('auth_token', token);
              window.dispatchEvent(new Event('auth:changed'));

              const me2 = await authAPI.getCurrentUser();
              if (cancelled) return;

              const u2 = me2?.user;
              setUser(u2 || null);
              setForm({
                displayName: u2?.display_name || '',
                country: u2?.country || '',
                dateOfBirth: u2?.date_of_birth || '',
                bio: u2?.bio || '',
                avatarUrl: u2?.avatar_url || '',
              });
              return;
            }
          }
        } catch {
          // ignore
        }
        if (!cancelled) setStatus({ type: 'error', message: err?.message || 'Failed to load profile' });
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    setStatus({ type: 'idle', message: '' });
    if (!file) return;

    if (!file.type?.startsWith('image/')) {
      setStatus({ type: 'error', message: 'Please select an image file' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'Image must be less than 5MB' });
      return;
    }

    if (!user?.user_id) {
      setStatus({ type: 'error', message: 'Not logged in' });
      return;
    }

    setIsUploading(true);
    try {
      const dataBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.onload = () => {
          const result = String(reader.result || '');
          const base64 = result.includes(',') ? result.split(',')[1] : result;
          resolve(base64);
        };
        reader.readAsDataURL(file);
      });

      const resp = await profileAPI.uploadAvatarFile({
        fileName: file.name || 'avatar.png',
        contentType: file.type,
        dataBase64,
      });

      const avatarUrl = resp?.avatarUrl;
      if (!avatarUrl) throw new Error('Failed to upload avatar');

      setForm((p) => ({ ...p, avatarUrl }));
      setStatus({ type: 'ok', message: 'Avatar updated' });
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'Avatar upload failed' });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await profileAPI.update({
        displayName: form.displayName,
        country: form.country,
        dateOfBirth: form.dateOfBirth,
        bio: form.bio,
        avatarUrl: form.avatarUrl,
      });
      setStatus({ type: 'ok', message: 'Saved changes' });
      window.dispatchEvent(new Event('auth:changed'));
      router.push('/community/player-profile');
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'Failed to save changes' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-28 px-6">
      <div className="max-w-3xl mx-auto bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-none p-8 md:p-12">
        <h1 className="text-3xl font-black uppercase italic mb-8">Edit <span className="text-[#38C2D9]">Profile</span></h1>

        <div className="space-y-8">
          {/* Avatar Change */}
          <div className="flex items-center gap-6 pb-8 border-b border-white/5">
            <div className="w-20 h-20 rounded-full border-2 border-[#38C2D9] bg-black/10 dark:bg-black/40 overflow-hidden flex items-center justify-center">
              {form.avatarUrl ? (
                <img src={form.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">👤</span>
              )}
            </div>
            <label className="text-xs font-bold py-2 px-4 bg-black/10 dark:bg-white/10 rounded-none hover:bg-[#38C2D9] hover:text-black transition-all cursor-pointer">
              {isUploading ? 'UPLOADING...' : 'CHANGE AVATAR'}
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" disabled={isUploading} />
            </label>
          </div>

          {isLoading ? (
            <div className="text-sm text-black/60 dark:text-white/50">Loading...</div>
          ) : null}
          {status.type === 'error' ? (
            <div className="text-sm text-pink-400">{status.message}</div>
          ) : null}
          {status.type === 'ok' ? (
            <div className="text-sm text-[#38C2D9]">{status.message}</div>
          ) : null}

          {/* Form Fields */}
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-black/60 dark:text-gray-400">Gamer Tag</label>
              <input 
                type="text" 
                value={user?.username || ''} 
                readOnly
                className="bg-white/60 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-none p-4 outline-none transition-all text-black/60 dark:text-white/70"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-black/60 dark:text-gray-400">Display Name</label>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => setForm((p) => ({ ...p, displayName: e.target.value }))}
                  className="bg-white/60 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-none p-4 focus:border-[#38C2D9] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-black/60 dark:text-gray-400">Country</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                  className="bg-white/60 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-none p-4 focus:border-[#38C2D9] outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Date of Birth</label>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => setForm((p) => ({ ...p, dateOfBirth: e.target.value }))}
                className="bg-white/60 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-none p-4 focus:border-[#38C2D9] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-black/60 dark:text-gray-400">Bio</label>
              <textarea 
                placeholder="Tell the community about yourself..."
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                className="bg-white/60 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-none p-4 h-32 focus:border-[#38C2D9] outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={isLoading || isUploading}
              className="flex-1 bg-[#38C2D9] text-black font-black py-4 rounded-none hover:scale-[1.02] transition-transform disabled:opacity-60"
            >
              SAVE CHANGES
            </button>
            <button 
              onClick={() => window.history.back()}
              className="px-6 sm:px-8 border border-black/10 dark:border-white/10 rounded-none font-bold text-sm hover:bg-red-500/20 hover:border-red-500/50 transition-all"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}