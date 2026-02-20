"use client";
import { useState } from 'react';
import { Input } from './Input';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  
  // State for inputs (Add these to capture data)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const brand = { teal: '#38C2D9', purple: '#B04198', blue: '#007EC6' };

  // This function handles the button click
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Logic for Sign In or Registration would happen here
    if (isLogin) {
      console.log("Logging in with:", email, password);
      // After successful login:
      router.push("/"); // Redirect to Home or Dashboard
    } else {
      console.log("Registering user...");
      // For registration, you'd usually trigger the email verification here
      alert("Registration successful! Please check your email to verify your account.");
      router.push("/login"); 
    }
  };

  return (
    <div className="w-full max-w-md p-8 dark:bg-[#1A1A1A]/90 bg-white backdrop-blur-xl border border-white/5 rounded-sm shadow-2xl">
      {/* Tabs */}
      <div className="flex mb-8 border-b border-white/10">
        {['SIGN IN', 'JOIN'].map((tab) => (
          <button
            key={tab}
            type="button" // Use type="button" so it doesn't submit the form
            onClick={() => setIsLogin(tab === 'SIGN IN')}
            className={`flex-1 pb-4 text-xs font-bold tracking-widest transition-all ${
              (isLogin && tab === 'SIGN IN') || (!isLogin && tab === 'JOIN')
                ? 'border-b-2 dark:text-white text-black'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            style={{ borderBottomColor: ((isLogin && tab === 'SIGN IN') || (!isLogin && tab === 'JOIN')) ? brand.teal : 'transparent' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ONE Form tag that handles everything */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="flex gap-4">
              <Input label="First Name" placeholder="First Name" />
              <Input label="Last Name" placeholder="Last Name" />
            </div>
            <Input label="Birth Date" type="date" />
            <Input label="Country" placeholder="Select Country" />
          </>
        )}

        <Input 
          label="Email" 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {!isLogin && <Input label="Confirm Password" type="password" placeholder="••••••••" />}

        {isLogin ? (
          <div className="text-center">
            <button type="button" className="text-[11px] text-[#007EC6] hover:underline uppercase tracking-tighter">Forgot Password?</button>
          </div>
        ) : (
          <div className="flex items-start space-x-2 pt-2">
            <input type="checkbox" required className="mt-1 accent-[#38C2D9]" />
            <label className="text-[10px] text-gray-400 leading-tight uppercase"><Link href="/terms">Click here to agree to terms and conditions</Link></label>
          </div>
        )}

        <button 
          type="submit"
          className="w-full py-4 font-bold tracking-[0.2em] text-white transition-transform active:scale-[0.98] uppercase text-sm"
          style={{ background: `linear-gradient(90deg, ${brand.teal}, ${brand.blue})` }}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}