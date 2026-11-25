import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    candidateEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    coverNote: {
      type: String,
      default: "",
    },
    categoryAnswers: {
      type: Map,
      of: String,
      default: {},
    },
    status: {
      type: String,
      enum: ["applied", "screening", "interview", "offer", "rejected", "hired"],
      default: "applied",
    },
  },
  { timestamps: true },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
