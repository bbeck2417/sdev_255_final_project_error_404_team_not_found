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
      <div className="hidden md:flex items-center p-4 w-full font-science-gothic">
        {/* Left spacer */}
        <div className="flex-1"></div>

        {/* Center links */}
        <div className="flex-1 flex justify-center gap-10">
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

        {/* Right spacer with logout button */}
        <div className="flex-1 flex justify-end">
          {session?.userId && <LogoutButton />}
        </div>
      </div>

      <details className="group w-full md:hidden font-science-gothic">
        <summary className="flex cursor-pointer list-none items-center justify-between p-4 marker:hidden">
          <span className="text-xl font-medium">
            Xavier&apos;s School
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded border border-yellow-400 bg-slate-900 transition-colors group-open:bg-yellow-400 group-open:text-black">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                className="group-open:hidden"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                className="hidden group-open:block"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Toggle navigation menu</span>
          </span>
        </summary>

        <div className="flex flex-col gap-1 border-t border-yellow-400/40 px-4 pb-4">
          <Link
            href="/"
            className="py-3 text-lg font-medium transition-colors hover:text-yellow-300"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="py-3 text-lg font-medium transition-colors hover:text-yellow-300"
          >
            Course Management
          </Link>
          <Link
            href="/about"
            className="py-3 text-lg font-medium transition-colors hover:text-yellow-300"
          >
            About
          </Link>
          {session?.userId && (
            <div className="pt-2">
              <LogoutButton />
            </div>
          )}
        </div>
      </details>

      {/* 3. The Inset Bottom Border */}
      <div className="h-px w-11/12 bg-yellow-400 opacity-50"></div>
    </nav>
  );
}
