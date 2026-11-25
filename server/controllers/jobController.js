import Job from "../models/Job.js";

// @desc   Create a new job (recruiter/admin only)
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      employmentType,
      category,
      screeningQuestions,
    } = req.body;

    if (!title || !description || !location || !category) {
      return res.status(400).json({
        message: "Title, description, location, and category are required",
      });
    }

    const job = await Job.create({
      title,
      description,
      location,
      employmentType,
      category,
      screeningQuestions: screeningQuestions || [],
      createdBy: req.user._id,
    });

    res.status(201).json({ job });
  } catch (error) {
    console.error("❌ Create job error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get all OPEN jobs (public, for candidates browsing)
export const getPublicJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" })
      .sort({ createdAt: -1 })
      .populate("category", "name");
    res.json({ jobs });
  } catch (error) {
    console.error("❌ Get public jobs error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get all jobs regardless of status (recruiter dashboard)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");
    res.json({ jobs });
  } catch (error) {
    console.error("❌ Get all jobs error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get single job by id (public detail page)
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("category");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ job });
  } catch (error) {
    console.error("❌ Get job by id error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update job status (open/closed) or details
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { title, description, location, employmentType, status } = req.body;

    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (employmentType) job.employmentType = employmentType;
    if (status) job.status = status;

    await job.save();

    res.json({ job });
  } catch (error) {
    console.error("❌ Update job error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
