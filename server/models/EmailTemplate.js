import mongoose from "mongoose";

const emailTemplateSchema = new mongoose.Schema(
  {
    triggerStatus: {
      type: String,
      enum: ["applied", "screening", "interview", "offer", "rejected", "hired"],
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateSchema);

export default EmailTemplate;
