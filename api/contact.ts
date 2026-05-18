import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required." });
  }

  // Initialize Supabase Client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Save to Supabase 'contacts' table
      const { error: dbError } = await supabase
        .from("contacts")
        .insert([{ name, email, message }]);

      if (dbError) {
        console.error("Supabase insertion error:", dbError);
      } else {
        console.log("Successfully saved contact to Supabase.");
      }
    } catch (err) {
      console.error("Failed to connect to Supabase:", err);
    }
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
    return res
      .status(500)
      .json({ error: "Server email configuration is missing." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 1. Email to the owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // 2. Auto-reply to the sender
    await transporter.sendMail({
      from: `"TechByDivy" <${emailUser}>`,
      to: email,
      subject: "Thank you for reaching out!",
      text: `Hi ${name},\n\nThank you for your message. I have received it and will contact you as fast as possible.\n\nYour message:\n${message}\n\nBest regards,\nDivy`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p>Hi ${name},</p>
          <p>Thank you for reaching out! I have received your message and will get back to you as fast as possible.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Your message:</strong></p>
          <p style="color: #555;"><em>${message.replace(/\n/g, "<br>")}</em></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>Best regards,<br><strong>Divy</strong></p>
        </div>
      `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Emails sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
