export function toFieldName(label) {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "") // strip special characters
    .split(" ")
    .filter(Boolean)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
}
