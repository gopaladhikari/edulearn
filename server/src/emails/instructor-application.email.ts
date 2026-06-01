import { type Content } from "mailgen";

export const instructorApprovedTemplate = (name: string): Content => {
  return {
    body: {
      name,
      intro: [
        "Congratulations! 🎉 Your application to become an instructor at Edulearn has been approved.",
        "Our team was highly impressed by your qualifications and expertise.",
      ],
      outro:
        "A member of our team will contact you directly via this email address shortly to discuss the next steps and help you get set up. Welcome aboard!",
    },
  };
};

export const instructorRejectedTemplate = (
  name: string,
  rejectionReason: string
): Content => {
  return {
    body: {
      name,
      intro: [
        "Thank you for your interest in becoming an instructor at Edulearn.",
        "After carefully reviewing your profile and credentials, we regret to inform you that we are unable to accept your application at this time.",
      ],
      dictionary: {
        "Reason for Decision":
          rejectionReason ||
          "Your application did not meet our baseline criteria at this time.",
      },
      outro:
        "We truly appreciate your time, effort, and interest in sharing your expertise with our learning community. We wish you the absolute best in your future teaching endeavors.",
    },
  };
};
