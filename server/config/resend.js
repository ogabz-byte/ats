import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

if (process.env.RESEND_API_KEY) {
  console.log("✅ Resend configured");
} else {
  console.error("❌ RESEND_API_KEY missing — check your .env");
}

export default resend;
