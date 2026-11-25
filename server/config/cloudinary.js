import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  console.log(`✅ Cloudinary configured: ${process.env.CLOUDINARY_CLOUD_NAME}`);
} else {
  console.error("❌ Cloudinary config missing — check your .env values");
}

export const uploadResumeToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // "raw" because it's a PDF/doc, not an image
        folder: "ats-resumes",
        public_id: `${Date.now()}-${fileName}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    stream.end(fileBuffer);
  });
};

export default cloudinary;
