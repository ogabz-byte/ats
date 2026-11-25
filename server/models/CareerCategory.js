import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "textarea", "number", "select", "url"],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [String],
      default: undefined, // only relevant when type is "select"
    },
  },
  { _id: false },
);

const careerCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fields: {
      type: [fieldSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const CareerCategory = mongoose.model("CareerCategory", careerCategorySchema);

export default CareerCategory;
