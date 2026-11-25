"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import CategoryFieldRow from "@/components/dashboard/CategoryFieldRow";

export default function CategoryForm({ initialCategory = null }) {
  const router = useRouter();
  const isEditMode = Boolean(initialCategory);

  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { label: "", fieldName: "", type: "text", required: false, options: [] },
    ]);
  };

  const updateField = (index, key, value) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [key]: value } : f)),
    );
  };

  const removeField = (index) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditMode) {
        await apiFetch(`/categories/${initialCategory._id}`, {
          method: "PATCH",
          body: { name, fields },
        });
      } else {
        await apiFetch("/categories", {
          method: "POST",
          body: { name, fields },
        });
      }

      router.push("/dashboard/categories");
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
        <label className="block text-sm font-medium mb-1">Category Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Marketing"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">
            Application Fields
          </label>
          <button
            type="button"
            onClick={addField}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Field
          </button>
        </div>

        {fields.length === 0 && (
          <p className="text-sm text-gray-400">
            No custom fields yet — candidates will just see the base application
            form.
          </p>
        )}

        <div className="space-y-3">
          {fields.map((field, index) => (
            <CategoryFieldRow
              key={index}
              field={field}
              index={index}
              onChange={updateField}
              onRemove={removeField}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEditMode
            ? "Save Changes"
            : "Create Category"}
      </button>
    </form>
  );
}
