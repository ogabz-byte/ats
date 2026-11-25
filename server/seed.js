import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Job from "./models/Job.js";
import Application from "./models/Application.js";
import CareerCategory from "./models/CareerCategory.js";
import EmailTemplate from "./models/EmailTemplate.js";

dotenv.config();

const DEMO_EMAIL = "demo@ats-project.com";
const DEMO_PASSWORD = "demo1234";

const sampleJobs = [
  {
    title: "Frontend Engineer",
    description:
      "We're looking for a Frontend Engineer comfortable with React and Next.js to help build our core product experience.",
    location: "Lagos, Nigeria (Remote)",
    employmentType: "Full-time",
    categoryName: "Software Engineering",
  },
  {
    title: "Product Designer",
    description:
      "Join our small design team to shape the end-to-end experience of our platform, from research to polished UI.",
    location: "Lagos, Nigeria (Hybrid)",
    employmentType: "Full-time",
    categoryName: "Design",
  },
  {
    title: "Backend Engineer Intern",
    description:
      "A great opportunity for a student or recent graduate to get hands-on experience with Node.js and MongoDB.",
    location: "Remote",
    employmentType: "Internship",
    categoryName: "Internship",
  },
];

const sampleApplicants = [
  { candidateName: "Amaka Obi", candidateEmail: "amaka.obi@example.com" },
  { candidateName: "Tunde Bakare", candidateEmail: "tunde.bakare@example.com" },
  {
    candidateName: "Chiamaka Nwosu",
    candidateEmail: "chiamaka.nwosu@example.com",
  },
];

const categories = [
  {
    name: "Software Engineering",
    fields: [
      {
        label: "GitHub or Portfolio URL",
        fieldName: "portfolioUrl",
        type: "url",
        required: true,
      },
      {
        label: "Years of Experience",
        fieldName: "yearsExperience",
        type: "number",
        required: true,
      },
      {
        label: "Primary Tech Stack",
        fieldName: "techStack",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "Design",
    fields: [
      {
        label: "Portfolio URL",
        fieldName: "portfolioUrl",
        type: "url",
        required: true,
      },
      {
        label: "Design Tools Used",
        fieldName: "designTools",
        type: "text",
        required: false,
      },
    ],
  },
  {
    name: "Sales",
    fields: [
      {
        label: "Years in Sales",
        fieldName: "yearsExperience",
        type: "number",
        required: true,
      },
      {
        label: "Highest Quota Achieved",
        fieldName: "quotaAchieved",
        type: "text",
        required: false,
      },
    ],
  },
  {
    name: "Internship",
    fields: [
      {
        label: "School / University",
        fieldName: "school",
        type: "text",
        required: true,
      },
      {
        label: "Expected Graduation Year",
        fieldName: "gradYear",
        type: "number",
        required: true,
      },
    ],
  },
];

const emailTemplates = [
  {
    triggerStatus: "applied",
    subject: "We've received your application — {{jobTitle}}",
    body: "Hi {{candidateName}},\n\nThanks for applying to the {{jobTitle}} role. We've received your application and will be in touch if there's a match.\n\nBest,\nThe Hiring Team",
  },
  {
    triggerStatus: "screening",
    subject: "Your application is under review — {{jobTitle}}",
    body: "Hi {{candidateName}},\n\nGood news — your application for {{jobTitle}} has moved to our screening stage. We'll reach out with next steps soon.\n\nBest,\nThe Hiring Team",
  },
  {
    triggerStatus: "interview",
    subject: "Interview invitation — {{jobTitle}}",
    body: "Hi {{candidateName}},\n\nWe'd love to move forward with an interview for the {{jobTitle}} role. Someone from our team will reach out shortly to schedule a time.\n\nBest,\nThe Hiring Team",
  },
  {
    triggerStatus: "offer",
    subject: "An offer for you — {{jobTitle}}",
    body: "Hi {{candidateName}},\n\nWe're excited to extend an offer for the {{jobTitle}} role. Details will follow from our team shortly.\n\nBest,\nThe Hiring Team",
  },
  {
    triggerStatus: "rejected",
    subject: "Update on your application — {{jobTitle}}",
    body: "Hi {{candidateName}},\n\nThank you for your interest in the {{jobTitle}} role. After careful consideration, we've decided to move forward with other candidates at this time. We wish you the best in your search.\n\nBest,\nThe Hiring Team",
  },
  {
    triggerStatus: "hired",
    subject: "Welcome aboard — {{jobTitle}}!",
    body: "Hi {{candidateName}},\n\nCongratulations! We're thrilled to welcome you to the team for the {{jobTitle}} role. Our team will follow up with onboarding details soon.\n\nBest,\nThe Hiring Team",
  },
];

// A placeholder resume URL — reused across seeded applicants for demo purposes only
const PLACEHOLDER_RESUME_URL =
  "https://res.cloudinary.com/demo/raw/upload/sample-resume.pdf";

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // Categories are shared reference data, not tied to the demo user — clear and reseed separately
    await CareerCategory.deleteMany({});
    const createdCategories = {};
    for (const cat of categories) {
      const created = await CareerCategory.create(cat);
      createdCategories[cat.name] = created._id;
      console.log(`✅ Category created: ${created.name}`);
    }

    // Email templates are shared reference data, reseed fresh each time
    await EmailTemplate.deleteMany({});
    for (const template of emailTemplates) {
      await EmailTemplate.create(template);
    }
    console.log(`✅ ${emailTemplates.length} email templates seeded`);

    // Clear existing demo data so this script is safe to re-run
    const existingDemoUser = await User.findOne({ email: DEMO_EMAIL });
    if (existingDemoUser) {
      const oldJobs = await Job.find({ createdBy: existingDemoUser._id });
      const oldJobIds = oldJobs.map((j) => j._id);
      await Application.deleteMany({ job: { $in: oldJobIds } });
      await Job.deleteMany({ createdBy: existingDemoUser._id });
      await User.deleteOne({ _id: existingDemoUser._id });
      console.log("🧹 Cleared old demo data");
    }

    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
    const demoUser = await User.create({
      name: "Demo Recruiter",
      email: DEMO_EMAIL,
      passwordHash,
      role: "recruiter",
    });
    console.log("✅ Demo recruiter created");

    for (const jobData of sampleJobs) {
      const { categoryName, ...jobFields } = jobData;
      const job = await Job.create({
        ...jobFields,
        category: createdCategories[categoryName],
        createdBy: demoUser._id,
      });
      console.log(`✅ Job created: ${job.title}`);

      for (const applicant of sampleApplicants) {
        await Application.create({
          job: job._id,
          candidateName: applicant.candidateName,
          candidateEmail: applicant.candidateEmail,
          resumeUrl: PLACEHOLDER_RESUME_URL,
          coverNote: `Excited about the ${job.title} role — I think my background is a strong fit.`,
          status: "applied",
        });
      }
      console.log(`   ↳ ${sampleApplicants.length} applicants added`);
    }

    console.log("🎉 Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
