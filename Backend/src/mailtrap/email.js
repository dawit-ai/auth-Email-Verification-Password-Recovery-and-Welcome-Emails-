import { client, sender } from "./mailtrap.config.js";

import {
  confirmationEmailTemplate,
  passwordResetEmailTemplate,
  welcomeEmailTemplate,
  passwordChangedEmailTemplate,
} from "./mailTemplete.js";


// ==========================================
// MAIN EMAIL FUNCTION
// ==========================================

const sendEmail = async ({
  to,
  subject,
  html,
  category,
}) => {
  try {
    console.log(`📤 Sending ${category} email to: ${to}`);

    const response = await client.send({
      from: sender,
      to: [
        {
          email: to,
        },
      ],
      subject,
      html,
      category,
    });

    console.log(`✅ ${category} email sent successfully`);

    return response;

  } catch (error) {
    console.error(
      `❌ Failed to send ${category} email:`,
      error.message
    );

    throw new Error(
      `Unable to send ${category} email: ${error.message}`
    );
  }
};


// ==========================================
// SEND VERIFICATION EMAIL
// ==========================================

export const sendConfirmationEmail = async (
  email,
  name,
  verificationToken
) => {
  return await sendEmail({
    to: email,
    subject: "Verify your email address",
    html: confirmationEmailTemplate(
      name,
      verificationToken
    ),
    category: "email-confirmation",
  });
};


// ==========================================
// SEND WELCOME EMAIL
// This will be called AFTER email verification
// ==========================================

export const sendWelcomeEmail = async (
  email,
  name
) => {
  return await sendEmail({
    to: email,
    subject: "Welcome to Advanced Auth ",
    html: welcomeEmailTemplate(name),
    category: "welcome",
  });
};


// ==========================================
// SEND PASSWORD RESET EMAIL
// ==========================================

export const sendResetPasswordEmail = async (
  email,
  name,
  resetUrl
) => {
  return await sendEmail({
    to: email,
    subject: "Reset your password",
    html: passwordResetEmailTemplate(
      name,
      resetUrl
    ),
    category: "password-reset",
  });
};


// ==========================================
// SEND PASSWORD CHANGED EMAIL
// ==========================================

export const sendPasswordChangedEmail = async (
  email,
  name
) => {
  return await sendEmail({
    to: email,
    subject: "Your password was changed",
    html: passwordChangedEmailTemplate(name),
    category: "password-changed",
  });
};