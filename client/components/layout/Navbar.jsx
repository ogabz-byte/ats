import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          ATS<span className="text-gray-400">.</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/jobs" className="text-gray-600 hover:text-black">
            Browse Jobs
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-black"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Recruiter Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
