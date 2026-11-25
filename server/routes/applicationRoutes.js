import express from "express";
import {
  submitApplication,
  getApplicationsForJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public — candidate applies to a job
router.post("/:jobId", upload.single("resume"), submitApplication);

// Protected — recruiter views/manages applications
router.get("/job/:jobId", protect, getApplicationsForJob);
router.patch("/:id/status", protect, updateApplicationStatus);

export default router;
