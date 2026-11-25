import express from "express";
import {
  createJob,
  getPublicJobs,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getPublicJobs);
router.get("/:id", getJobById);

// Protected routes (recruiter/admin)
router.post("/", protect, createJob);
router.get("/admin/all", protect, getAllJobs);
router.patch("/:id", protect, updateJob);

export default router;
