import { Resend } from "resend";
import Mailgen, { type Content } from "mailgen";
import { clientUrl } from "./constants.js";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendEmail = async (
  email: string,
  subject: string,
  body: Content
) => {
  try {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Edulearn",
        link: clientUrl,
      },
    });

    const html = mailGenerator.generate(body);

    const { data, error } = await resend.emails.send({
      from: "Edulearn <edulearn@gopal-adhikari.com.np>",
      to: [email],
      subject,
      html,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
