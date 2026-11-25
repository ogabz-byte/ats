import StatusDropdown from "@/components/dashboard/StatusDropdown";
import PendingEmailButton from "@/components/dashboard/PendingEmailButton";

export default function ApplicantRow({ application }) {
  const categoryAnswers = application.categoryAnswers
    ? Object.entries(application.categoryAnswers)
    : [];

  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium">{application.candidateName}</p>
          <p className="text-sm text-gray-500">{application.candidateEmail}</p>
          <PendingEmailButton applicationId={application._id} />
        </div>

        {categoryAnswers.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {categoryAnswers.map(([key, value]) => (
              <span
                key={key}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {key}: {value}
              </span>
            ))}
          </div>
        )}

        {application.coverNote && (
          <p className="text-sm text-gray-600 mt-1 max-w-md">
            {application.coverNote}
          </p>
        )}
        <a
          href={application.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline mt-1 inline-block"
        >
          View Resume
        </a>
      </div>

      <StatusDropdown
        applicationId={application._id}
        currentStatus={application.status}
      />
    </div>
  );
}
