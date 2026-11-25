"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function JobForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [screeningQuestions, setScreeningQuestions] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const loadCategories = async () => {
  //     try {
  //       const { categories } = await apiFetch("/categories");
  //       setCategories(categories);
  //       if (categories.length > 0) {
  //         setCategory(categories[0]._id);
  //       }
  //     } catch (err) {
  //       console.error("Failed to load categories:", err.message);
  //     }
  //   };

  //   loadCategories();
  // }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [{ categories }, { templates }] = await Promise.all([
          apiFetch("/categories"),
          apiFetch("/screening-templates"),
        ]);
        setCategories(categories);
        setTemplates(templates);
        if (categories.length > 0) {
          setCategory(categories[0]._id);
        }
      } catch (err) {
        console.error("Failed to load form data:", err.message);
      }
    };

    loadData();
  }, []);

  const addQuestion = () => {
    setScreeningQuestions((prev) => [
      ...prev,
      { question: "", requiredAnswer: "Yes" },
    ]);
  };

  const addFromTemplate = () => {
    if (!selectedTemplateId) return;

    const template = templates.find((t) => t._id === selectedTemplateId);
    if (!template) return;

    setScreeningQuestions((prev) => [
      ...prev,
      { question: template.question, requiredAnswer: template.requiredAnswer },
    ]);
    setSelectedTemplateId("");
  };

  const updateQuestion = (index, key, value) => {
    setScreeningQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [key]: value } : q)),
    );
  };

  const removeQuestion = (index) => {
    setScreeningQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { job } = await apiFetch("/jobs", {
        method: "POST",
        body: {
          title,
          description,
          location,
          employmentType,
          category,
          screeningQuestions,
        },
      });

      router.push(`/dashboard/jobs/${job._id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Career Category
        </label>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Employment Type
        </label>
        <select
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          required
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">
            Screening Questions (optional)
          </label>
          <button
            type="button"
            onClick={addQuestion}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Question
          </button>
        </div>

        {templates.length > 0 && (
          <div className="flex gap-2 mb-3 bg-gray-50 border border-gray-200 rounded-md p-2">
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
            >
              <option value="">Pick a saved template...</option>
              {templates.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.question}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addFromTemplate}
              className="text-sm border border-gray-300 px-3 py-1.5 rounded-md hover:border-gray-500"
            >
              Insert
            </button>
          </div>
        )}

        {screeningQuestions.length === 0 && (
          <p className="text-sm text-gray-400">
            No screening questions yet. Candidates who fail these will be
            auto-rejected.
          </p>
        )}

        <div className="space-y-3">
          {screeningQuestions.map((q, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-3 flex gap-2 items-start"
            >
              <input
                type="text"
                placeholder="e.g. Are you authorized to work in Nigeria?"
                required
                value={q.question}
                onChange={(e) =>
                  updateQuestion(index, "question", e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <select
                value={q.requiredAnswer}
                onChange={(e) =>
                  updateQuestion(index, "requiredAnswer", e.target.value)
                }
                className="border border-gray-300 rounded-md px-2 py-2 text-sm"
              >
                <option value="Yes">Requires Yes</option>
                <option value="No">Requires No</option>
              </select>
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-sm text-red-500 hover:underline px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
}
