import type { Content } from "mailgen";

export const forgotPasswordTemplate = (name: string, url: string): Content => {
  return {
    body: {
      name,
      intro: "You requested to reset your password.",
      action: {
        instructions:
          "Click the button below to reset your password. This link is valid for a limited time.",
        button: {
          color: "#EF4444",
          text: "Reset Password",
          link: url,
        },
      },
      outro:
        "If you did not request a password reset, please ignore this email.",
    },
  };
};
