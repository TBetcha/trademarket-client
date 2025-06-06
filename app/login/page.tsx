import { LoginForm } from "../components/LoginForm";
export default function Home() {
  return (
    <div className="text-white bg-gray-800 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-5xl font-[family-name:var(--font-geist-sans)]">
      <LoginForm />
    </div>
  );
}
