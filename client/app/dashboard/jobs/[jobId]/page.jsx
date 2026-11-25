import { serverFetch } from "@/lib/serverFetch";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ApplicantRow from "@/components/dashboard/ApplicantRow";

export default async function JobApplicantsPage({ params }) {
  const { jobId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { applications } = await serverFetch(`/applications/job/${jobId}`);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Applicants</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <div className="border border-gray-200 rounded-lg divide-y">
          {applications.map((app) => (
            <ApplicantRow key={app._id} application={app} />
          ))}
        </div>
      )}
    </main>
  );
}
