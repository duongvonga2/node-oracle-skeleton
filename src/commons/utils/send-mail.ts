import Nodemailer from "nodemailer";
import fs from "fs";

export const sendMail = async (
  receiver: string,
  subject: string,
  html: string
) => {
  try {
    const transportOptions = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASSWORD,
      },
    };
    const transport = Nodemailer.createTransport(transportOptions);

    const info = await transport.sendMail({
      from: process.env.MAIL_SENDER,
      to: receiver,
      subject,
      html,
    });
    return info;
  } catch (error) {
    throw error;
  }
};
