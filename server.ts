import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import { createClient } from "@supabase/supabase-js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    // Initialize Supabase Client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        // Save to Supabase 'contacts' table
        const { error: dbError } = await supabase
          .from('contacts')
          .insert([{ name, email, message }]);
          
        if (dbError) {
          console.error("Supabase insertion error:", dbError);
          // We log the error but continue to send the email
        } else {
          console.log("Successfully saved contact to Supabase.");
        }
      } catch (err) {
        console.error("Failed to connect to Supabase:", err);
      }
    } else {
      console.warn("Supabase credentials not found. Skipping database insertion.");
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
      return res.status(500).json({ error: "Server email configuration is missing." });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      // 1. Email to the owner (you)
      await transporter.sendMail({
        from: `"Portfolio Contact" <${emailUser}>`,
        to: emailUser, // Send to yourself
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
        to: email, // Send to the person who filled the form
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

      res.status(200).json({ success: true, message: "Emails sent successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
