import mongoose from "mongoose";

const screeningQuestionTemplateSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    requiredAnswer: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const ScreeningQuestionTemplate = mongoose.model(
  "ScreeningQuestionTemplate",
  screeningQuestionTemplateSchema,
);

export default ScreeningQuestionTemplate;
