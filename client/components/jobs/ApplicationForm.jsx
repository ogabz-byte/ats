"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import DynamicField from "@/components/jobs/DynamicField";

export default function ApplicationForm({
  jobId,
  categoryFields = [],
  screeningQuestions = [],
}) {
  const router = useRouter();
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [resume, setResume] = useState(null);
  const [dynamicValues, setDynamicValues] = useState({});
  const [screeningAnswers, setScreeningAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDynamicChange = (fieldName, value) => {
    setDynamicValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleScreeningChange = (index, value) => {
    setScreeningAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!resume) {
      setError("Please attach your resume");
      return;
    }

    if (
      screeningQuestions.length > 0 &&
      Object.keys(screeningAnswers).length < screeningQuestions.length
    ) {
      setError("Please answer all screening questions");
      return;
    }

    // Convert { 0: "Yes", 1: "No" } into an array matching question order
    const screeningAnswersArray = screeningQuestions.map(
      (_, index) => screeningAnswers[index],
    );

    const formData = new FormData();
    formData.append("candidateName", candidateName);
    formData.append("candidateEmail", candidateEmail);
    formData.append("coverNote", coverNote);
    formData.append("resume", resume);
    formData.append("categoryAnswers", JSON.stringify(dynamicValues));
    formData.append("screeningAnswers", JSON.stringify(screeningAnswersArray));

    setLoading(true);
    try {
      await apiFetch(`/applications/${jobId}`, {
        method: "POST",
        body: formData,
        isFormData: true,
      });

      router.push(`/jobs/${jobId}/apply/success`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          required
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      {categoryFields.map((field) => (
        <div key={field.fieldName}>
          <label className="block text-sm font-medium mb-1">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          <DynamicField
            field={field}
            value={dynamicValues[field.fieldName] || ""}
            onChange={handleDynamicChange}
          />
        </div>
      ))}

      {screeningQuestions.length > 0 && (
        <div className="border-t border-gray-200 pt-4 space-y-3">
          <p className="text-sm font-medium">Screening Questions</p>
          {screeningQuestions.map((q, index) => (
            <div key={index}>
              <label className="block text-sm text-gray-700 mb-1">
                {q.question}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-sm">
                  <input
                    type="radio"
                    name={`screening-${index}`}
                    required
                    onChange={() => handleScreeningChange(index, "Yes")}
                  />
                  Yes
                </label>
                <label className="flex items-center gap-1.5 text-sm">
                  <input
                    type="radio"
                    name={`screening-${index}`}
                    required
                    onChange={() => handleScreeningChange(index, "No")}
                  />
                  No
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Cover Note (optional)
        </label>
        <textarea
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Resume (PDF or Word)
        </label>
        <input
          type="file"
          required
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          className="w-full text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
