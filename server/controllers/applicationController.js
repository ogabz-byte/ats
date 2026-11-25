import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { uploadResumeToCloudinary } from "../config/cloudinary.js";
import EmailTemplate from "../models/EmailTemplate.js";
import PendingEmail from "../models/PendingEmail.js";
import { fillTemplate } from "../utils/fillTemplate.js";

// @desc   Submit an application (public, candidate-facing)
export const submitApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const {
      candidateName,
      candidateEmail,
      coverNote,
      categoryAnswers,
      screeningAnswers,
    } = req.body;

    if (!candidateName || !candidateEmail) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const job = await Job.findById(jobId);
    if (!job || job.status !== "open") {
      return res
        .status(404)
        .json({ message: "Job not found or no longer accepting applications" });
    }

    // Push the buffer from multer straight to Cloudinary
    const uploadResult = await uploadResumeToCloudinary(
      req.file.buffer,
      req.file.originalname,
    );

    // categoryAnswers arrives as a JSON string inside the multipart form data — needs parsing
    const parsedAnswers = categoryAnswers ? JSON.parse(categoryAnswers) : {};
    const parsedScreeningAnswers = screeningAnswers
      ? JSON.parse(screeningAnswers)
      : [];

    // Check each screening question against the candidate's answer at the same index.
    // If ANY answer doesn't match the required answer, the application is auto-rejected.
    let autoRejected = false;
    for (let i = 0; i < job.screeningQuestions.length; i++) {
      const requiredAnswer = job.screeningQuestions[i].requiredAnswer;
      const candidateAnswer = parsedScreeningAnswers[i];

      if (candidateAnswer !== requiredAnswer) {
        autoRejected = true;
        break;
      }
    }

    const application = await Application.create({
      job: jobId,
      candidateName,
      candidateEmail,
      coverNote,
      resumeUrl: uploadResult.secure_url,
      categoryAnswers: parsedAnswers,
      status: autoRejected ? "rejected" : "applied",
    });

    res.status(201).json({ application });
  } catch (error) {
    console.error("❌ Submit application error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get all applications for a specific job (recruiter dashboard)
export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId }).sort({
      createdAt: -1,
    });

    res.json({ applications });
  } catch (error) {
    console.error("❌ Get applications error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update an application's status (recruiter moving pipeline stage)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "applied",
      "screening",
      "interview",
      "offer",
      "rejected",
      "hired",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Create a pending email draft for this status change, if a template exists
    const template = await EmailTemplate.findOne({ triggerStatus: status });

    if (template) {
      const data = {
        candidateName: application.candidateName,
        jobTitle: application.job.title,
      };

      await PendingEmail.create({
        application: application._id,
        to: application.candidateEmail,
        subject: fillTemplate(template.subject, data),
        body: fillTemplate(template.body, data),
      });
    }

    res.json({ application });
  } catch (error) {
    console.error("❌ Update application status error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
