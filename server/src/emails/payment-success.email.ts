import type { Content } from "mailgen";

export const paymentSuccessTemplate = (
  name: string,
  courseTitle: string
): Content => {
  return {
    body: {
      name,
      intro: `🎉 Payment successful! You are now enrolled in "${courseTitle}".`,
      action: {
        instructions: "Start learning right away:",
        button: {
          color: "#22C55E",
          text: "Go to Course",
          link: "https://yourdomain.com/my-courses",
        },
      },
      outro:
        "Thank you for choosing Edulearn. We wish you a great learning journey!",
    },
  };
};
