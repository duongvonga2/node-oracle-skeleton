import fs from "fs";
import bcrypt from "bcrypt";
import { sendMail } from "../../commons/utils/send-mail";

export const sendMailToVerify = async (receiver: string, token: string) => {
  const verifyUrl = process.env.MAIL_VERIFY_URL;
  const appName = process.env.APP_NAME;
  let verifyHtml = fs.readFileSync("assets/verify-email.html").toString();
  const encodeToken = bcrypt.hashSync(token, 10);
  const actionUrl = `${verifyUrl}?email=${receiver}&token=${encodeToken}`;
  verifyHtml = verifyHtml.replace(/{{action_url}}/g, actionUrl);
  verifyHtml = verifyHtml.replace(/{{app_name}}/g, appName);
  return await sendMail(receiver, "Radio Story - Verify Account", verifyHtml);
};

export const sendMailToResetPassword = async (
  receiver: string,
  password: string
) => {
  const appName = process.env.APP_NAME;
  let resetPassHtml = fs.readFileSync("assets/reset-password.html").toString();
  resetPassHtml = resetPassHtml.replace(/{{password}}/g, password);
  resetPassHtml = resetPassHtml.replace(/{{app_name}}/g, appName);
  return await sendMail(
    receiver,
    "Radio Story - Reset password",
    resetPassHtml
  );
};
