export default function DynamicField({ field, value, onChange }) {
  const baseClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm";

  if (field.type === "textarea") {
    return (
      <textarea
        required={field.required}
        rows={3}
        value={value}
        onChange={(e) => onChange(field.fieldName, e.target.value)}
        className={baseClass}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        required={field.required}
        value={value}
        onChange={(e) => onChange(field.fieldName, e.target.value)}
        className={baseClass}
      >
        <option value="">Select...</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  // covers "text", "number", "url"
  return (
    <input
      type={field.type}
      required={field.required}
      value={value}
      onChange={(e) => onChange(field.fieldName, e.target.value)}
      className={baseClass}
    />
  );
}
