"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function TemplateForm({ onCreated }) {
  const [question, setQuestion] = useState("");
  const [requiredAnswer, setRequiredAnswer] = useState("Yes");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { template } = await apiFetch("/screening-templates", {
        method: "POST",
        body: { question, requiredAnswer },
      });

      setQuestion("");
      setRequiredAnswer("Yes");
      onCreated(template);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
      <input
        type="text"
        required
        placeholder="e.g. Are you authorized to work in Nigeria?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
      />
      <select
        value={requiredAnswer}
        onChange={(e) => setRequiredAnswer(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-2 text-sm"
      >
        <option value="Yes">Requires Yes</option>
        <option value="No">Requires No</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
