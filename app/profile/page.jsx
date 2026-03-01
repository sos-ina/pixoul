"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // No user logged in? Send to login
        router.push('/login');
      } else if (!session.user.email_confirmed_at) {
        // User logged in BUT email not verified? Keep them here or show message
        setUser(session.user);
        setLoading(false);
      } else {
        // Everything is good!
        setUser(session.user);
        setLoading(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  if (loading) return <div className="min-h-screen dark:bg-black dark:text-white bg-white text-black flex items-center justify-center">Loading Pixoul...</div>;

  // Barrier: Show this if the email isn't confirmed yet
  if (user && !user.email_confirmed_at) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center p-8 sm:p-10 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-none shadow-[0_0_30px_rgba(56,194,217,0.06)]">
          <h2 className="text-3xl font-bold mb-4 text-[#38C2D9]">CHECK YOUR INBOX</h2>
          <p className="text-black/70 dark:text-white/70 mb-6 mb-6">
            We sent a verification link to <span className="text-black dark:text-white font-bold">{user.email}</span>. 
            You must verify your email to access your Pixoul profile.
          </p>
          <button 
            onClick={() => supabase.auth.resend({ type: 'signup', email: user.email })}
            className="text-xs uppercase tracking-widest py-3 px-6 rounded-none border border-[#38C2D9] text-[#38C2D9] hover:bg-[#38C2D9]/10 transition-all disabled:opacity-50"
          >
            Resend Verification Link
          </button>
        </div>
      </div>
    );
  }

  // Success: This is the actual Profile/Dashboard
  return (
    <main className="min-h-screen pt-24 px-6 sm:px-8 bg-white dark:bg-[#0a0a0a] text-black dark:text-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0]}</h1>
      <p className="text-[#38C2D9]">Authenticated & Verified Profile Page</p>
      
      {/* Add your profile details here */}
    </main>
  );
}