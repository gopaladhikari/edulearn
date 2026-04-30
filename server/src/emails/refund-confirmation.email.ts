import type { Content } from "mailgen";

export const refundTemplate = (name: string, courseTitle: string): Content => {
  return {
    body: {
      name,
      intro: `Your refund for "${courseTitle}" has been successfully processed.`,
      outro:
        "If you have any questions, feel free to contact our support team.",
    },
  };
};
