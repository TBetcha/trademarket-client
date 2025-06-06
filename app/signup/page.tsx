import Image from "next/image";
import { SignUpForm } from "../components/SignUpForm";

export default function Home() {
  return (
    <div className="grid grid-rows-[5px_1fr_5px] text-white bg-gray-800 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-5xl font-[family-name:var(--font-geist-sans)]">
      <h1>We've been waiting for you</h1>
      <SignUpForm />
    </div>
  );
}
