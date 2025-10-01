import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });

  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password from Vercel Environment Variables
    },
  });

  // Romantic & aesthetic email body
  let body = `
  <div style="font-family: 'Georgia', serif; color: #6b1e3c; background: #fff0f5; padding: 20px; border-radius: 12px;">
    <h1 style="text-align:center; color: #d63384;">💌 Love Questionnaire Submission 💌</h1>
    <p style="font-size:16px;"><b>Sender Name:</b> ${
      data["Name (filled by)"] || "N/A"
    }</p>
    <p style="font-size:16px;"><b>Sender Email:</b> ${
      data["Email (filled by)"] || "N/A"
    }</p>
    <hr style="border:1px dashed #d63384; margin: 20px 0;" />
  `;

  if (data && typeof data === "object") {
    for (const section in data) {
      if (section === "Name (filled by)" || section === "Email (filled by)")
        continue; // skip sender info
      body += `<h2 style="color:#e83e8c; border-bottom: 1px solid #d63384; padding-bottom:4px;">❤️ ${section} ❤️</h2>`;
      const answers = data[section];
      if (typeof answers === "object") {
        for (const q in answers) {
          body += `
          <p style="margin:10px 0;">
            <b style="color:#6f42c1;">${q}</b><br/>
            <span style="color:#212529;">${answers[q]}</span>
          </p>`;
        }
      }
    }
  } else {
    body += "<p>No data received.</p>";
  }

  body += `
    <hr style="border:1px dashed #d63384; margin: 20px 0;" />
    <p style="text-align:center; color:#d63384;">Sent with 💖 by your secret admirer</p>
  </div>
  `;

  // --- Handle Attachments ---
  const attachments = [];
  const attachmentSections = ["Captured Memories", "Secretly Recorded Video"];

  for (const sectionName of attachmentSections) {
    if (data[sectionName] && Array.isArray(data[sectionName])) {
      for (const media of data[sectionName]) {
        if (media && media.content && media.name) {
          // Extract base64 content from data URL
          // Format: "data:[<mediatype>];base64,<data>"
          const base64Content = media.content.split(",")[1];
          if (base64Content) {
            attachments.push({
              filename: media.name,
              content: base64Content,
              encoding: "base64",
              contentType: media.type,
            });
          }
        }
      }
    }
  }

  try {
    await transporter.sendMail({
      from: "Love Letter 🤍",
      to: "abdullah.qamar137@gmail.com",
      subject: "Love Questionnaire Submission",
      html: body,
      attachments: attachments, // Add attachments here
    });
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message || err });
  }
}
