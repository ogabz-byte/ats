import express from "express";
import {
  getAllTemplates,
  createTemplate,
  deleteTemplate,
} from "../controllers/screeningTemplateController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All protected — templates are a recruiter-only tool, no public use case
router.get("/", protect, getAllTemplates);
router.post("/", protect, createTemplate);
router.delete("/:id", protect, deleteTemplate);

export default router;
