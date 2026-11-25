import ScreeningQuestionTemplate from "../models/ScreeningQuestionTemplate.js";

// @desc   Get all screening question templates
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await ScreeningQuestionTemplate.find().sort({
      createdAt: -1,
    });
    res.json({ templates });
  } catch (error) {
    console.error("❌ Get templates error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Create a new screening question template
export const createTemplate = async (req, res) => {
  try {
    const { question, requiredAnswer } = req.body;

    if (!question || !requiredAnswer) {
      return res
        .status(400)
        .json({ message: "Question and required answer are required" });
    }

    const template = await ScreeningQuestionTemplate.create({
      question,
      requiredAnswer,
      createdBy: req.user._id,
    });

    res.status(201).json({ template });
  } catch (error) {
    console.error("❌ Create template error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete a screening question template
export const deleteTemplate = async (req, res) => {
  try {
    const template = await ScreeningQuestionTemplate.findByIdAndDelete(
      req.params.id,
    );

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({ message: "Template deleted" });
  } catch (error) {
    console.error("❌ Delete template error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
