import { apiFetch } from "@/lib/api";
import JobCard from "@/components/jobs/JobCard";

export default async function JobsPage() {
  const { jobs } = await apiFetch("/jobs");

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Open Positions</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No open positions right now.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </main>
  );
}
