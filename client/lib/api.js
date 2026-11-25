const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiFetch(endpoint, options = {}) {
  const { method = "GET", body, isFormData = false } = options;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
