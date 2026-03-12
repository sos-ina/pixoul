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
      <div className="min-h-screen dark:bg-[#0D0D0D] dark:text-white bg-white text-black flex items-center justify-center px-4">
        <div className="text-center p-10 border border-[#B04198] bg-[#B04198]/5 rounded-sm max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-[#38C2D9]">CHECK YOUR INBOX</h2>
          <p className="text-gray-400 mb-6">
            We sent a verification link to <span className="text-white font-bold">{user.email}</span>. 
            You must verify your email to access your Pixoul profile.
          </p>
          <button 
            onClick={() => supabase.auth.resend({ type: 'signup', email: user.email })}
            className="text-xs uppercase tracking-widest py-3 px-6 border border-[#38C2D9] hover:bg-[#38C2D9] hover:text-black transition-all"
          >
            Resend Verification Link
          </button>
        </div>
      </div>
    );
  }

  // Success: This is the actual Profile/Dashboard
  return (
    <main className="min-h-screen pt-24 px-8 text-white bg-black">
      <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0]}</h1>
      <p className="text-[#38C2D9]">Authenticated & Verified Profile Page</p>
      
      {/* Add your profile details here */}
    </main>
  );
}