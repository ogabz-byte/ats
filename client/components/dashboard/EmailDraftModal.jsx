"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function EmailDraftModal({
  email,
  onClose,
  onSent,
  onDiscarded,
}) {
  const [subject, setSubject] = useState(email.subject);
  const [body, setBody] = useState(email.body);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    setError("");
    setLoading(true);

    try {
      // Save any edits first, then send
      await apiFetch(`/pending-emails/${email._id}`, {
        method: "PATCH",
        body: { subject, body },
      });

      await apiFetch(`/pending-emails/${email._id}/send`, { method: "POST" });

      onSent(email._id);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = async () => {
    setLoading(true);
    try {
      await apiFetch(`/pending-emails/${email._id}`, { method: "DELETE" });
      onDiscarded(email._id);
      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <h2 className="text-lg font-semibold mb-1">Review Email</h2>
        <p className="text-sm text-gray-500 mb-4">To: {email.to}</p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleDiscard}
            disabled={loading}
            className="text-sm text-red-500 hover:underline disabled:opacity-50"
          >
            Discard
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="text-sm border border-gray-300 px-4 py-2 rounded-md hover:border-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={loading}
              className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
