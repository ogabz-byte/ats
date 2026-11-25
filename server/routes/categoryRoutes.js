import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Both public — candidates need this too, to know what fields to fill in
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Protected
router.post("/", protect, createCategory);
router.patch("/:id", protect, updateCategory);

export default router;
