import JobForm from "@/components/dashboard/JobForm";

export default function NewJobPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <JobForm />
    </main>
  );
}
