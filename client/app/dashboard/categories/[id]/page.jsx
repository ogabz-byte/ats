import { serverFetch } from "@/lib/serverFetch";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import CategoryForm from "@/components/dashboard/CategoryForm";

export default async function EditCategoryPage({ params }) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { category } = await serverFetch(`/categories/${id}`);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <CategoryForm initialCategory={category} />
    </main>
  );
}
