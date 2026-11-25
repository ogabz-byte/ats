import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import "./config/cloudinary.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import screeningTemplateRoutes from "./routes/screeningTemplateRoutes.js";
import pendingEmailRoutes from "./routes/pendingEmailRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is alive" });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/screening-templates", screeningTemplateRoutes);
app.use("/api/pending-emails", pendingEmailRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
