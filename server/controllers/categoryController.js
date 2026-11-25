import CareerCategory from "../models/CareerCategory.js";

// @desc   Create a new career category (admin/recruiter)
export const createCategory = async (req, res) => {
  try {
    const { name, fields } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await CareerCategory.findOne({ name });
    if (existing) {
      return res
        .status(400)
        .json({ message: "A category with this name already exists" });
    }

    const category = await CareerCategory.create({
      name,
      fields: fields || [],
    });
    res.status(201).json({ category });
  } catch (error) {
    console.error("❌ Create category error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get all career categories (used to populate job creation dropdown + drive dynamic forms)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CareerCategory.find().sort({ name: 1 });
    res.json({ categories });
  } catch (error) {
    console.error("❌ Get categories error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get a single category by id (used to know which fields to render on the apply form)
export const getCategoryById = async (req, res) => {
  try {
    const category = await CareerCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ category });
  } catch (error) {
    console.error("❌ Get category by id error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update an existing category's fields
export const updateCategory = async (req, res) => {
  try {
    const { name, fields } = req.body;

    const category = await CareerCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) category.name = name;
    if (fields) category.fields = fields;

    await category.save();
    res.json({ category });
  } catch (error) {
    console.error("❌ Update category error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
