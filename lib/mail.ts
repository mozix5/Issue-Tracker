import nodemailer from "nodemailer";

const getTransporter = async () => {
  // If SMTP environment variables are defined, use them.
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback: Create a mock transporter using Ethereal Email for local testing
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error("Failed to create Ethereal testing account, falling back to console mail log.");
    return null;
  }
};

type MailOptions = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: MailOptions) => {
  const transporter = await getTransporter();
  const from = process.env.SMTP_FROM || '"Issue Tracker" <noreply@issuetracker.com>';

  if (!transporter) {
    console.log("=== MOCK EMAIL SENT ===");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${html}`);
    console.log("=======================");
    return;
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    // If using local testing smtp.ethereal.email, print the preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`✉️ Test Email Sent! Preview URL: ${previewUrl}`);
    } else {
      console.log(`✉️ Email sent successfully to ${to} (MessageID: ${info.messageId})`);
    }
    return info;
  } catch (error) {
    console.error("Error occurred while sending email:", error);
  }
};

export const sendAssigneeNotification = async (
  assigneeEmail: string,
  assigneeName: string,
  issueId: number,
  issueTitle: string,
  changerName: string
) => {
  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const issueUrl = `${appUrl}/issues/${issueId}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
      <h2 style="color: #4f46e5; margin-bottom: 16px;">Ticket Assigned to You</h2>
      <p>Hello <strong>${assigneeName}</strong>,</p>
      <p><strong>${changerName}</strong> has assigned the following ticket to you:</p>
      
      <div style="background-color: #f8fafc; padding: 16px; border-left: 4px solid #4f46e5; margin: 20px 0; border-radius: 4px;">
        <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #1e293b;">#${issueId}: ${issueTitle}</h4>
        <a href="${issueUrl}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: bold; margin-top: 8px;">View Issue</a>
      </div>

      <p style="font-size: 12px; color: #64748b; margin-top: 32px;">This is an automated notification. Please do not reply directly to this email.</p>
    </div>
  `;

  await sendEmail({
    to: assigneeEmail,
    subject: `[Assigned] #${issueId}: ${issueTitle}`,
    html,
  });
};

export const sendCommentNotification = async (
  recipientEmail: string,
  recipientName: string,
  issueId: number,
  issueTitle: string,
  commenterName: string,
  commentText: string
) => {
  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const issueUrl = `${appUrl}/issues/${issueId}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
      <h2 style="color: #4f46e5; margin-bottom: 16px;">New Comment on Ticket</h2>
      <p>Hello <strong>${recipientName}</strong>,</p>
      <p><strong>${commenterName}</strong> left a comment on a ticket you are assigned to:</p>
      
      <div style="background-color: #f8fafc; padding: 16px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #64748b;">Re: #${issueId}: ${issueTitle}</h4>
        <div style="font-style: italic; color: #334155; margin-bottom: 16px; border-left: 2px solid #cbd5e1; padding-left: 12px;">
          "${commentText}"
        </div>
        <a href="${issueUrl}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: bold;">Reply to Comment</a>
      </div>

      <p style="font-size: 12px; color: #64748b; margin-top: 32px;">This is an automated notification. Please do not reply directly to this email.</p>
    </div>
  `;

  await sendEmail({
    to: recipientEmail,
    subject: `[New Comment] #${issueId}: ${issueTitle}`,
    html,
  });
};
