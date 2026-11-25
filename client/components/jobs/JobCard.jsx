import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="block border border-gray-200 rounded-lg p-5 hover:border-gray-400 transition-colors"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{job.title}</h3>
        {job.category && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
            {job.category.name}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {job.location} · {job.employmentType}
      </p>
      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
        {job.description}
      </p>
    </Link>
  );
}
