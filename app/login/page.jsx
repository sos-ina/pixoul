import AuthForm from '@/components/ui/AuthForm';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center dark:bg-[#0D0D0D] dark:text-white bg-white text-black overflow-hidden">
      {/* Aesthetic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#38C2D9] opacity-10 blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#B04198] opacity-10 blur-[150px]" />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-[#38C2D9] text-xl font-bold tracking-[0.3em] mb-10 uppercase" style={{ fontFamily: 'Klapt, sans-serif' }}>
          Sign In and Registration
        </h2>
        <AuthForm />
      </div>
    </main>
  );
}