import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import JobRow from "@/components/dashboard/JobRow";
import Link from "next/link";
import { serverFetch } from "../../lib/serverFetch";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { jobs } = await serverFetch("/jobs/admin/all");

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link
            href="/dashboard/categories"
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-500"
          >
            Manage Categories
          </Link>
          <Link
            href="/dashboard/screening-templates"
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-500"
          >
            Manage Screening Templates
          </Link>
          <Link
            href="/dashboard/jobs/new"
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            + New Job
          </Link>
        </div>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="border border-gray-200 rounded-lg divide-y">
          {jobs.map((job) => (
            <JobRow key={job._id} job={job} />
          ))}
        </div>
      )}
    </main>
  );
}
