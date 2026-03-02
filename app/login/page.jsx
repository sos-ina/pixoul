import AuthForm from '@/components/ui/AuthForm';

export const metadata = {
  title: "Login | Pixoul Gaming",
};

export default function LoginPage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white dark:bg-[#0D0D0D]">
      {/* Aesthetic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#38C2D9] opacity-10 blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#B04198] opacity-10 blur-[150px]" />

      <div className="relative z-10 flex flex-col items-center">
        <AuthForm />
      </div>
    </div>
  );
}