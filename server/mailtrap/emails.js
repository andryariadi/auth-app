import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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

    console.log("Welcomeemail sent welcome successfully:", res);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};
