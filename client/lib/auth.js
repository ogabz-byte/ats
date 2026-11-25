import { serverFetch } from "@/lib/serverFetch";

export async function getCurrentUser() {
  try {
    const { user } = await serverFetch("/auth/me");
    return user;
  } catch (err) {
    return null;
  }
}
