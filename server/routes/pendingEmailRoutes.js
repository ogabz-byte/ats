import express from "express";
import {
  getPendingEmailsForApplication,
  updatePendingEmail,
  sendPendingEmail,
  discardPendingEmail,
} from "../controllers/pendingEmailController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/application/:applicationId",
  protect,
  getPendingEmailsForApplication,
);
router.patch("/:id", protect, updatePendingEmail);
router.post("/:id/send", protect, sendPendingEmail);
router.delete("/:id", protect, discardPendingEmail);

export default router;
