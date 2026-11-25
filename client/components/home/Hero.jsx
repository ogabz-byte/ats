import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-3xl mx-auto px-4 pt-20 pb-16 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        Hiring, done the honest way.
      </h1>
      <p className="mt-4 text-gray-600 text-lg">
        No black-box AI scoring. Just clear job listings, structured
        applications, and a pipeline recruiters can actually see and control.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/jobs"
          className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Browse Open Roles
        </Link>
        <Link
          href="/login"
          className="border border-gray-300 px-6 py-3 rounded-md text-sm font-medium hover:border-gray-500 transition-colors"
        >
          I'm Hiring
        </Link>
      </div>
    </section>
  );
}
