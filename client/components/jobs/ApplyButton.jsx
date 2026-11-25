import Link from "next/link";

export default function ApplyButton({ jobId }) {
  return (
    <Link
      href={`/jobs/${jobId}/apply`}
      className="inline-block bg-black text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
    >
      Apply for this role
    </Link>
  );
}
