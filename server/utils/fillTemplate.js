export function fillTemplate(text, data) {
  return text.replace(/{{(.*?)}}/g, (match, key) => {
    const trimmedKey = key.trim();
    return data[trimmedKey] !== undefined ? data[trimmedKey] : match;
  });
}
