import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function serverFetch(endpoint) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: token ? { Cookie: `token=${token.value}` } : undefined,
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
