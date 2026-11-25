import Link from "next/link";

export default function CategoryRow({ category }) {
  return (
    <Link
      href={`/dashboard/categories/${category._id}`}
      className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
    >
      <div>
        <p className="font-medium">{category.name}</p>
        <p className="text-sm text-gray-500">
          {category.fields.length} custom field
          {category.fields.length !== 1 ? "s" : ""}
        </p>
      </div>
    </Link>
  );
}
