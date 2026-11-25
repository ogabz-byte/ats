"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import TemplateForm from "@/components/dashboard/TemplateForm";
import TemplateRow from "@/components/dashboard/TemplateRow";

export default function ScreeningTemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const { templates } = await apiFetch("/screening-templates");
        setTemplates(templates);
      } catch (err) {
        console.error("Failed to load templates:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleCreated = (newTemplate) => {
    setTemplates((prev) => [newTemplate, ...prev]);
  };

  const handleDeleted = (id) => {
    setTemplates((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Screening Question Templates</h1>

      <TemplateForm onCreated={handleCreated} />

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : templates.length === 0 ? (
          <p className="text-sm text-gray-400">
            No templates yet — add one above.
          </p>
        ) : (
          <div className="border border-gray-200 rounded-lg divide-y">
            {templates.map((t) => (
              <TemplateRow key={t._id} template={t} onDeleted={handleDeleted} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
