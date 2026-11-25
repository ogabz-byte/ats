import mongoose from "mongoose";

const pendingEmailSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const PendingEmail = mongoose.model("PendingEmail", pendingEmailSchema);

export default PendingEmail;
