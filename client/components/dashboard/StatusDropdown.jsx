"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const STATUSES = [
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "hired",
];

export default function StatusDropdown({ applicationId, currentStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      await apiFetch(`/applications/${applicationId}/status`, {
        method: "PATCH",
        body: { status: newStatus },
      });
      router.refresh();
    } catch (err) {
      setStatus(currentStatus); // revert on failure
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className="text-sm border border-gray-300 rounded-md px-2 py-1.5 capitalize disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
