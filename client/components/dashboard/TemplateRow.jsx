"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function TemplateRow({ template, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiFetch(`/screening-templates/${template._id}`, {
        method: "DELETE",
      });
      onDeleted(template._id);
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-sm">{template.question}</p>
        <p className="text-xs text-gray-400">
          Requires: {template.requiredAnswer}
        </p>
      </div>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-sm text-red-500 hover:underline disabled:opacity-50"
      >
        {deleting ? "Removing..." : "Delete"}
      </button>
    </div>
  );
}
