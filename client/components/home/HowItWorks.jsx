const steps = [
  {
    title: "Post a role",
    description:
      "Recruiters create a job listing with clear requirements — no guesswork.",
  },
  {
    title: "Candidates apply",
    description:
      "A simple structured form, resume upload included. No account required.",
  },
  {
    title: "Manage the pipeline",
    description:
      "Track every applicant through screening, interviews, and offers in one place.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>

      <div className="grid sm:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={step.title}>
            <div className="text-sm text-gray-400 font-mono">0{index + 1}</div>
            <h3 className="font-semibold mt-2">{step.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
