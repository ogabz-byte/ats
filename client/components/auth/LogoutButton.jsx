"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="text-gray-600 hover:text-black">
      Log out
    </button>
  );
}
