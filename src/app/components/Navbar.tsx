import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black text-white shadow-md flex flex-col items-center">
      {/* 1. Main Navbar Content */}
      <div className="flex items-center justify-center p-4 w-full font-wolverine">
        <div className="flex gap-10">
          <Link
            href="/"
            className="hover:text-yellow-400 font-bold transition-colors"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="hover:text-yellow-400 font-bold transition-colors"
          >
            Courses
          </Link>
          <Link
            href="/about"
            className="hover:text-yellow-400 font-bold transition-colors"
          >
            About
          </Link>
        </div>
      </div>

      {/* 2. The Inset Bottom Border */}
      {/* w-4/5 makes it 80% wide. mx-auto keeps it centered. */}
      <div className="h-px w-11/12 bg-yellow-400 opacity-50"></div>
    </nav>
  );
}
