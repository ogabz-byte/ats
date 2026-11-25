import mongoose from "mongoose";

const screeningQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    requiredAnswer: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
  },
  { _id: false },
);

const jobSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerCategory",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    screeningQuestions: {
      type: [screeningQuestionSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
