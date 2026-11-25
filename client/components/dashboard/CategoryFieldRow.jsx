"use client";

import { toFieldName } from "@/lib/slugify";

export default function CategoryFieldRow({ field, index, onChange, onRemove }) {
  const handleLabelChange = (value) => {
    onChange(index, "label", value);
    onChange(index, "fieldName", toFieldName(value));
  };

  const handleOptionsChange = (value) => {
    // Comma-separated input, e.g. "0-1, 1-3, 3-5, 5+"
    const options = value
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
    onChange(index, "options", options);
  };

  return (
    <div className="border border-gray-200 rounded-md p-3 space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Field label, e.g. Years of Experience"
          required
          value={field.label}
          onChange={(e) => handleLabelChange(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <select
          value={field.type}
          onChange={(e) => onChange(index, "type", e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-2 text-sm"
        >
          <option value="text">Text</option>
          <option value="textarea">Long Text</option>
          <option value="number">Number</option>
          <option value="url">URL</option>
          <option value="select">Dropdown</option>
        </select>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-sm text-red-500 hover:underline px-2"
        >
          Remove
        </button>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span>
          fieldName:{" "}
          <input
            type="text"
            value={field.fieldName}
            onChange={(e) => onChange(index, "fieldName", e.target.value)}
            className="border border-gray-200 rounded px-1.5 py-0.5 text-xs font-mono w-40"
          />
        </span>

        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onChange(index, "required", e.target.checked)}
          />
          Required
        </label>
      </div>

      {field.type === "select" && (
        <input
          type="text"
          placeholder="Options, comma-separated e.g. 0-1, 1-3, 3-5, 5+"
          defaultValue={field.options?.join(", ") || ""}
          onBlur={(e) => handleOptionsChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}
