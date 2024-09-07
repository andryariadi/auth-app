import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  const recipients = [
    {
      email,
    },
  ];

  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
      category: "Email Verification",
    });

    console.log("Email sent successfully:", res);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipients = [
    {
      email,
    },
  ];

  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "c5158e7c-7a7c-4d08-87f7-ca3b0111a56b",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });

    console.log("Welcome email sent welcome successfully:", res);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email, resetUrl) => {
  const recipients = [
    {
      email,
    },
  ];

  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully:", res);
  } catch (error) {
    console.log("Error sending reset password email:", error);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  const recipients = [
    {
      email,
    },
  ];

  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset success email sent successfully:", res);
  } catch (error) {
    console.log("Error sending reset password success email:", error);
    throw new Error(`Error sending reset password success email: ${error}`);
  }
};
