import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export default async function Navbar() {
  // Check if the user has an active session
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black text-yellow-400 shadow-md flex flex-col items-center">
      {/* 1. Main Navbar Content */}
      <div className="flex items-center justify-between p-4 w-full font-wolverine px-8">
        {/* Spacer: Keeps the center links perfectly centered by balancing the right side */}
        <div className="w-48"></div>

        <div className="flex gap-10">
          <Link
            href="/"
            className="hover:text-yellow-300 font-medium text-2xl transition-colors"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="hover:text-yellow-300 font-medium text-2xl transition-colors"
          >
            Course Management
          </Link>
          <Link
            href="/about"
            className="hover:text-yellow-300 font-medium text-2xl transition-colors"
          >
            About
          </Link>
        </div>

        {/* 2. Conditional Logout Button pins to the right */}
        <div className="w-48 flex justify-end">
          {session?.userId && <LogoutButton />}
        </div>
      </div>

      {/* 3. The Inset Bottom Border */}
      <div className="h-px w-11/12 bg-yellow-400 opacity-50"></div>
    </nav>
  );
}
