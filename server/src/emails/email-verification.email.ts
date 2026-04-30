import { type Content } from "mailgen";

export const emailVerificationTemplate = (
  name: string,
  url: string
): Content => {
  return {
    body: {
      name,
      intro: "Welcome to Edulearn! 🎓 We're excited to have you on board.",
      action: {
        instructions:
          "Please verify your email address to start exploring courses and learning.",
        button: {
          color: "#4F46E5",
          text: "Verify Email",
          link: url,
        },
      },
      outro:
        "If you did not create this account, you can safely ignore this email.",
    },
  };
};
