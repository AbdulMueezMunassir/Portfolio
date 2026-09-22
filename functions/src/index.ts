import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as nodemailer from "nodemailer";

// Target database ID matching the portfolio's Firestore instance
const DATABASE_ID = "ai-studio-abdulmueezportfo-f6d26ed4-f1bc-43be-915a-b7135d91e566";
const OWNER_EMAIL = process.env.OWNER_EMAIL || "abmueez593@gmail.com";

/**
 * Creates a Nodemailer transporter using environment variables.
 * Compatible with Gmail App Passwords, SendGrid, Mailgun, Brevo, or standard SMTP.
 */
function getEmailTransporter() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    logger.warn(
      "SMTP credentials (SMTP_USER / SMTP_PASS) not configured. Cloud function will log notification but cannot dispatch email until credentials are provided."
    );
    return null;
  }

  // If custom SMTP host is specified
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  // Default: Gmail service with App Password
  return nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

/**
 * Firebase Cloud Function triggered automatically on document creation in the `messages` collection.
 * Delivers instant email notifications to Abdul Mueez (abmueez593@gmail.com).
 */
export const onNewContactMessage = onDocumentCreated(
  {
    document: "messages/{messageId}",
    database: DATABASE_ID,
    region: "us-central1",
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No document data snapshot found for trigger event.");
      return;
    }

    const data = snapshot.data();
    const messageId = event.params.messageId;

    const name = (data?.name as string) || "Anonymous Visitor";
    const senderEmail = (data?.email as string) || "Not provided";
    const subject = (data?.subject as string) || "Portfolio Inquiry";
    const message = (data?.message as string) || "(Empty message content)";
    const createdAt = (data?.createdAt as string) || new Date().toISOString();

    logger.info(
      `[New Contact Message] Document ID: ${messageId} | From: "${name}" <${senderEmail}> | Subject: "${subject}"`
    );

    const transporter = getEmailTransporter();
    if (!transporter) {
      logger.info(
        `Message saved in Firestore at messages/${messageId}. To receive external email alerts, configure SMTP_USER and SMTP_PASS in your Firebase Cloud Function environment.`
      );
      return;
    }

    const formattedDate = new Date(createdAt).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER || OWNER_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: senderEmail,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      text: `Hello Abdul Mueez,\n\nYou have received a new message through your portfolio contact form!\n\n` +
        `Sender Details:\n` +
        `• Name: ${name}\n` +
        `• Email: ${senderEmail}\n` +
        `• Subject: ${subject}\n` +
        `• Received At: ${formattedDate}\n\n` +
        `Message:\n${message}\n\n` +
        `--\n` +
        `Reply directly to this email to contact ${name} at ${senderEmail}.\n` +
        `Document Reference: messages/${messageId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Portfolio Message</title>
        </head>
        <body style="margin: 0; padding: 24px; background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 24px; text-align: left;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">
                New Contact Message Received
              </h1>
              <p style="margin: 4px 0 0 0; color: #e0f2fe; font-size: 13px;">
                Delivered via Firebase Cloud Functions from your portfolio
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 24px; color: #f8fafc;">
              
              <!-- Sender Card -->
              <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #94a3b8; width: 110px; font-weight: 600;">From:</td>
                    <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Email:</td>
                    <td style="padding: 6px 0;">
                      <a href="mailto:${senderEmail}" style="color: #38bdf8; text-decoration: none; font-weight: 500;">
                        ${senderEmail}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Subject:</td>
                    <td style="padding: 6px 0; color: #f1f5f9;">
                      ${subject}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94a3b8; font-weight: 600;">Date:</td>
                    <td style="padding: 6px 0; color: #94a3b8; font-size: 13px;">
                      ${formattedDate}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message Body -->
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #38bdf8; font-weight: 700;">
                  Message Body
                </h3>
                <div style="background-color: #0b1329; border: 1px solid #1e293b; border-left: 3px solid #0284c7; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #f8fafc; white-space: pre-wrap;">
${message}
                </div>
              </div>

              <!-- Action CTA -->
              <div style="text-align: center; padding: 12px 0 20px 0;">
                <a href="mailto:${senderEmail}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 4px 14px rgba(14, 165, 233, 0.4);">
                  Reply to ${name}
                </a>
              </div>

              <!-- Footer info -->
              <div style="border-top: 1px solid #1e293b; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
                <p style="margin: 0 0 4px 0;">
                  This message is also stored in your portfolio's <strong>Owner Portal Inbox</strong>.
                </p>
                <p style="margin: 0; font-size: 11px; font-family: monospace;">
                  Firestore ID: messages/${messageId}
                </p>
              </div>

            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      logger.info(
        `Email notification successfully dispatched to ${OWNER_EMAIL}. Message ID: ${info.messageId}`
      );
    } catch (err: any) {
      logger.error("Failed to dispatch email via Nodemailer:", err);
    }
  }
);
