import PendingEmail from "../models/PendingEmail.js";
import resend from "../config/resend.js";

// @desc   Get all pending (unsent) emails for a specific application
export const getPendingEmailsForApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const emails = await PendingEmail.find({
      application: applicationId,
      status: "pending",
    }).sort({ createdAt: -1 });

    res.json({ emails });
  } catch (error) {
    console.error("❌ Get pending emails error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update a draft's subject/body before sending (recruiter edits)
export const updatePendingEmail = async (req, res) => {
  try {
    const { subject, body } = req.body;

    const email = await PendingEmail.findById(req.params.id);
    if (!email) {
      return res.status(404).json({ message: "Pending email not found" });
    }

    if (subject) email.subject = subject;
    if (body) email.body = body;

    await email.save();
    res.json({ email });
  } catch (error) {
    console.error("❌ Update pending email error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Actually send the email via Resend, mark as sent
// export const sendPendingEmail = async (req, res) => {
//   try {
//     const email = await PendingEmail.findById(req.params.id);
//     if (!email) {
//       return res.status(404).json({ message: "Pending email not found" });
//     }

//     if (email.status === "sent") {
//       return res
//         .status(400)
//         .json({ message: "This email has already been sent" });
//     }

//     await resend.emails.send({
//       from: "ATS Demo <onboarding@resend.dev>", // swap once your own domain is verified
//       to: email.to,
//       subject: email.subject,
//       text: email.body,
//     });

//     email.status = "sent";
//     await email.save();

//     res.json({ email });
//   } catch (error) {
//     console.error("❌ Send pending email error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const sendPendingEmail = async (req, res) => {
  try {
    const email = await PendingEmail.findById(req.params.id);
    if (!email) {
      return res.status(404).json({ message: "Pending email not found" });
    }

    if (email.status === "sent") {
      return res
        .status(400)
        .json({ message: "This email has already been sent" });
    }

    const { data, error } = await resend.emails.send({
      from: "ATS Demo <onboarding@resend.dev>",
      to: email.to,
      subject: email.subject,
      text: email.body,
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      return res
        .status(502)
        .json({ message: error.message || "Failed to send email" });
    }

    console.log("✅ Email sent via Resend:", data.id);

    email.status = "sent";
    await email.save();

    res.json({ email });
  } catch (error) {
    console.error("❌ Send pending email error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Discard a draft without sending it
export const discardPendingEmail = async (req, res) => {
  try {
    const email = await PendingEmail.findByIdAndDelete(req.params.id);

    if (!email) {
      return res.status(404).json({ message: "Pending email not found" });
    }

    res.json({ message: "Draft discarded" });
  } catch (error) {
    console.error("❌ Discard pending email error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
