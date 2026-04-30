import type { Content } from "mailgen";

export const welcomeEmailTemplate = (name: string): Content => {
  return {
    body: {
      name,
      intro:
        "🎉 Your email has been successfully verified! Welcome to Edulearn.",
      table: {
        data: [
          {
            feature: "Explore Courses",
            description: "Browse and enroll in courses that match your goals.",
          },
          {
            feature: "Track Progress",
            description: "Monitor your learning progress and stay motivated.",
          },
          {
            feature: "Learn Anytime",
            description: "Access your courses anytime, anywhere.",
          },
        ],
        columns: {
          customWidth: {
            feature: "30%",
            description: "70%",
          },
        },
      },
      outro: "Happy learning! 🚀",
    },
  };
};
