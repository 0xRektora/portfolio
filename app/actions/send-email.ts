"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const subject = formData.get("subject") as string;
  let message = formData.get("message") as string;
  const fromEmail = formData.get("fromEmail") as string;
  message = `From: ${fromEmail || "Unknown"}\n${message}`;

  if (!subject || !message) {
    return {
      success: false,
      error: "Subject and message are required",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      error: "Resend API key is not configured",
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "portfolio@heyimwalid.dev",
      to: "sadek.walid.mendi@gmail.com",
      subject: subject,
      text: message,
      html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Failed to send email",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
