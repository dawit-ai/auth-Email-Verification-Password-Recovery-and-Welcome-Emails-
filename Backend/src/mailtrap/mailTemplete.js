// utils/mailTemplete.js

// ==========================================
// HELPERS
// ==========================================

// Prevent HTML injection inside email content
const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// Escape URLs used inside href=""
const escapeUrl = (url = "") => escapeHtml(url);

// ==========================================
// MAIN EMAIL LAYOUT
// ==========================================

const layout = ({ preheader = "", title, content }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <meta name="x-apple-disable-message-reformatting" />

  <title>${escapeHtml(title)}</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f1f5f9;
    color: #334155;
    font-family:
      Arial,
      Helvetica,
      sans-serif;
  "
>

  <!-- Hidden email preview text -->
  <div
    style="
      display: none;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      color: transparent;
    "
  >
    ${escapeHtml(preheader)}
  </div>

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="
      width: 100%;
      background-color: #f1f5f9;
      padding: 40px 16px;
    "
  >

    <tr>
      <td align="center">

        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            max-width: 620px;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow:
              0 10px 30px
              rgba(15, 23, 42, 0.08);
          "
        >

          <!-- HEADER -->

          <tr>
            <td
              style="
                padding: 32px;
                text-align: center;
                background-color: #4f46e5;
              "
            >

              <div
                style="
                  display: inline-block;
                  color: #ffffff;
                  font-size: 26px;
                  font-weight: 800;
                  letter-spacing: -0.5px;
                "
              >
                Advanced Auth
              </div>

              <p
                style="
                  margin: 8px 0 0;
                  color: #e0e7ff;
                  font-size: 14px;
                "
              >
                Secure authentication made simple
              </p>

            </td>
          </tr>


          <!-- MAIN CONTENT -->

          <tr>
            <td
              style="
                padding: 42px 36px;
                font-size: 16px;
                line-height: 1.7;
                color: #475569;
              "
            >

              ${content}

            </td>
          </tr>


          <!-- FOOTER -->

          <tr>
            <td
              style="
                padding: 28px 36px;
                background-color: #f8fafc;
                border-top: 1px solid #e2e8f0;
                text-align: center;
              "
            >

              <p
                style="
                  margin: 0 0 8px;
                  color: #64748b;
                  font-size: 13px;
                  line-height: 20px;
                "
              >
                © ${new Date().getFullYear()}
                Advanced Auth.
                All rights reserved.
              </p>

              <p
                style="
                  margin: 0;
                  color: #94a3b8;
                  font-size: 12px;
                  line-height: 18px;
                "
              >
                This is an automated security email.
                Please do not reply directly to this message.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>
`;


// ==========================================
// BUTTON
// ==========================================

const button = (label, url) => `
<table
  role="presentation"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="
    margin: 32px auto;
  "
>

  <tr>
    <td
      align="center"
      style="
        border-radius: 10px;
        background-color: #4f46e5;
      "
    >

      <a
        href="${escapeUrl(url)}"
        target="_blank"
        style="
          display: inline-block;
          padding: 15px 30px;
          color: #ffffff;
          background-color: #4f46e5;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
        "
      >
        ${escapeHtml(label)}
      </a>

    </td>
  </tr>

</table>
`;


// ==========================================
// SECURITY ALERT BOX
// ==========================================

const securityBox = (message) => `
<div
  style="
    margin: 28px 0;
    padding: 18px;
    background-color: #fff7ed;
    border: 1px solid #fed7aa;
    border-radius: 12px;
  "
>

  <p
    style="
      margin: 0;
      color: #9a3412;
      font-size: 14px;
      line-height: 1.7;
    "
  >
    <strong>Security notice:</strong>
    ${escapeHtml(message)}
  </p>

</div>
`;


// ==========================================
// SUCCESS BOX
// ==========================================

const successBox = (message) => `
<div
  style="
    margin: 28px 0;
    padding: 18px;
    background-color: #ecfdf5;
    border: 1px solid #a7f3d0;
    border-radius: 12px;
  "
>

  <p
    style="
      margin: 0;
      color: #065f46;
      font-size: 15px;
      line-height: 1.7;
    "
  >
    ${escapeHtml(message)}
  </p>

</div>
`;


// ==========================================
// 1. WELCOME EMAIL
// ==========================================

export const welcomeEmailTemplate = (name) => {
  const safeName = escapeHtml(name);

  return layout({
    preheader:
      "Welcome to Advanced Auth. Your account is ready.",

    title: "Welcome to Advanced Auth",

    content: `
      <h1
        style="
          margin: 0 0 16px;
          color: #0f172a;
          font-size: 30px;
          line-height: 1.3;
          letter-spacing: -0.6px;
        "
      >
        Welcome, ${safeName}! 👋
      </h1>

      <p style="margin: 0 0 18px;">
        We're excited to have you with us.
      </p>

      <p style="margin: 0;">
        Your account has been successfully created and
        you're ready to start using Advanced Auth.
      </p>

      ${successBox(
        "Your account is active and ready to use."
      )}

      <p style="margin: 0;">
        If you did not create this account, please
        contact our support team immediately.
      </p>

      <p
        style="
          margin: 28px 0 0;
          color: #0f172a;
          font-weight: 600;
        "
      >
        — The Advanced Auth Team
      </p>
    `,
  });
};


// ==========================================
// 2. EMAIL CONFIRMATION
// ==========================================

export const confirmationEmailTemplate = (
  name,
  verificationCode
) => {
  const safeName = escapeHtml(name);
  const safeCode = escapeHtml(verificationCode);

  return layout({
    preheader:
      "Use your verification code to confirm your email address.",

    title: "Verify your email address",

    content: `
      <h1
        style="
          margin: 0 0 16px;
          color: #0f172a;
          font-size: 30px;
          line-height: 1.3;
          letter-spacing: -0.6px;
        "
      >
        Verify your email
      </h1>

      <p style="margin: 0 0 18px;">
        Hi ${safeName},
      </p>

      <p style="margin: 0;">
        Thank you for creating an account with
        Advanced Auth. Use the verification code below
        to confirm your email address.
      </p>


      <!-- VERIFICATION CODE -->

      <div
        style="
          margin: 32px 0;
          padding: 24px 16px;
          background-color: #eef2ff;
          border: 1px solid #c7d2fe;
          border-radius: 16px;
          text-align: center;
        "
      >

        <p
          style="
            margin: 0 0 10px;
            color: #6366f1;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
          "
        >
          Your verification code
        </p>

        <div
          style="
            color: #3730a3;
            font-size: 36px;
            font-weight: 800;
            letter-spacing: 10px;
            line-height: 1.2;
          "
        >
          ${safeCode}
        </div>

      </div>

      ${securityBox(
        "This verification code expires in 24 hours. Never share this code with anyone."
      )}

      <p
        style="
          margin: 24px 0 0;
          color: #64748b;
          font-size: 14px;
        "
      >
        If you didn't create an Advanced Auth account,
        you can safely ignore this email.
      </p>
    `,
  });
};


// ==========================================
// 3. PASSWORD RESET EMAIL
// ==========================================

export const passwordResetEmailTemplate = (
  name,
  resetUrl
) => {
  const safeName = escapeHtml(name);
  const safeResetUrl = escapeUrl(resetUrl);

  return layout({
    preheader:
      "Reset your Advanced Auth password securely.",

    title: "Reset your password",

    content: `
      <h1
        style="
          margin: 0 0 16px;
          color: #0f172a;
          font-size: 30px;
          line-height: 1.3;
          letter-spacing: -0.6px;
        "
      >
        Reset your password 🔐
      </h1>

      <p style="margin: 0 0 18px;">
        Hi ${safeName},
      </p>

      <p style="margin: 0;">
        We received a request to reset the password
        for your Advanced Auth account.
      </p>

      ${button(
        "Reset Password",
        safeResetUrl
      )}

      <p
        style="
          margin: 0;
          text-align: center;
          color: #64748b;
          font-size: 13px;
        "
      >
        This reset link will expire in 24 hour.
      </p>

      ${securityBox(
        "If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged."
      )}

      <p
        style="
          margin: 28px 0 8px;
          color: #64748b;
          font-size: 13px;
        "
      >
        Button not working? Copy and paste this link
        into your browser:
      </p>

      <p
        style="
          margin: 0;
          color: #4f46e5;
          font-size: 12px;
          line-height: 1.6;
          word-break: break-all;
        "
      >
        ${safeResetUrl}
      </p>
    `,
  });
};


// ==========================================
// 4. PASSWORD CHANGED EMAIL
// ==========================================

export const passwordChangedEmailTemplate = (
  name
) => {
  const safeName = escapeHtml(name);

  return layout({
    preheader:
      "Your Advanced Auth password has been changed.",

    title: "Password changed successfully",

    content: `
      <h1
        style="
          margin: 0 0 16px;
          color: #0f172a;
          font-size: 30px;
          line-height: 1.3;
          letter-spacing: -0.6px;
        "
      >
        Password changed successfully ✓
      </h1>

      <p style="margin: 0 0 18px;">
        Hi ${safeName},
      </p>

      <p style="margin: 0;">
        Your password has been successfully changed.
      </p>

      ${successBox(
        "Your account is now protected with your new password."
      )}

      ${securityBox(
        "If you did not make this change, reset your password immediately and contact support."
      )}

      <p
        style="
          margin: 28px 0 0;
          color: #0f172a;
          font-weight: 600;
        "
      >
        — The Advanced Auth Security Team
      </p>
    `,
  });
};