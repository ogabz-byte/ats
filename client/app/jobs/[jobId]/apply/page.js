import { apiFetch } from "@/lib/api";
import ApplicationForm from "@/components/jobs/ApplicationForm";

export default async function ApplyPage({ params }) {
  const { jobId } = await params;
  const { job } = await apiFetch(`/jobs/${jobId}`);

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Apply for {job.title}</h1>
      <ApplicationForm
        jobId={jobId}
        categoryFields={job.category?.fields || []}
        screeningQuestions={job.screeningQuestions || []}
      />
    </main>
  );
}
