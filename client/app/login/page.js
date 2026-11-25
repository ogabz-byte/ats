import LoginForm from "@/components/auth/LoginForm";
import DemoLoginButton from "@/components/auth/DemoLoginButton";

export default function LoginPage() {
  return (
    <main className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Recruiter Login</h1>

      <DemoLoginButton />

      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-gray-200 flex-1" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="h-px bg-gray-200 flex-1" />
      </div>

      <LoginForm />
    </main>
  );
}
