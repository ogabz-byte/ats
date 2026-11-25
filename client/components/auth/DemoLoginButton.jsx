"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const DEMO_EMAIL = "demo@ats-project.com";
const DEMO_PASSWORD = "demo1234";

export default function DemoLoginButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await apiFetch("/auth/login", {
        method: "POST",
        body: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      alert("Demo login failed — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDemoLogin}
      disabled={loading}
      className="w-full border border-gray-300 px-5 py-2.5 rounded-md text-sm font-medium hover:border-gray-500 transition-colors disabled:opacity-50"
    >
      {loading ? "Logging in..." : "Try Demo Account →"}
    </button>
  );
}
