import { serverFetch } from "@/lib/serverFetch";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import CategoryRow from "@/components/dashboard/CategoryRow";
import Link from "next/link";

export default async function CategoriesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { categories } = await serverFetch("/categories");

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Career Categories</h1>
        <Link
          href="/dashboard/categories/new"
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          + New Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories yet.</p>
      ) : (
        <div className="border border-gray-200 rounded-lg divide-y">
          {categories.map((cat) => (
            <CategoryRow key={cat._id} category={cat} />
          ))}
        </div>
      )}
    </main>
  );
}
