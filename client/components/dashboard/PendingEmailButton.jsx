"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import EmailDraftModal from "@/components/dashboard/EmailDraftModal";

export default function PendingEmailButton({ applicationId }) {
  const [pendingEmails, setPendingEmails] = useState([]);
  const [activeEmail, setActiveEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPendingEmails = async () => {
    try {
      const { emails } = await apiFetch(
        `/pending-emails/application/${applicationId}`,
      );
      setPendingEmails(emails);
    } catch (err) {
      console.error("Failed to load pending emails:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingEmails();
  }, [applicationId]);

  const handleSent = (emailId) => {
    setPendingEmails((prev) => prev.filter((e) => e._id !== emailId));
  };

  const handleDiscarded = (emailId) => {
    setPendingEmails((prev) => prev.filter((e) => e._id !== emailId));
  };

  if (loading || pendingEmails.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setActiveEmail(pendingEmails[0])}
        className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium hover:bg-amber-200"
      >
        ✉️ {pendingEmails.length} pending
      </button>

      {activeEmail && (
        <EmailDraftModal
          email={activeEmail}
          onClose={() => setActiveEmail(null)}
          onSent={handleSent}
          onDiscarded={handleDiscarded}
        />
      )}
    </>
  );
}
