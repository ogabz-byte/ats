import { apiFetch } from "@/lib/api";
import ApplyButton from "@/components/jobs/ApplyButton";

export default async function JobDetailPage({ params }) {
  const { jobId } = await params;
  const { job } = await apiFetch(`/jobs/${jobId}`);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-sm text-gray-500 mt-1">
        {job.location} · {job.employmentType}
      </p>

      <div className="mt-6 whitespace-pre-line text-gray-700">
        {job.description}
      </div>

      <div className="mt-8">
        <ApplyButton jobId={job._id} />
      </div>
    </main>
  );
}
