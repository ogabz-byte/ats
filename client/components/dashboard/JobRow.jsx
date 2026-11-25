import Link from "next/link";

export default function JobRow({ job }) {
  return (
    <Link
      href={`/dashboard/jobs/${job._id}`}
      className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
    >
      <div>
        <p className="font-medium">{job.title}</p>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>

      <span
        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          job.status === "open"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {job.status}
      </span>
    </Link>
  );
}
