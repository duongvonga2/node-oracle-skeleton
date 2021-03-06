import jwt from "jsonwebtoken";
import { adminService } from "../../modules/admin/admin.service";
import { userService } from "../../modules/user/user.service";
import { BaseError } from "../utils";

export const genJWT = (payload: any) => {
  const secretKey = process.env.APP_SECRET_KEY;

  return jwt.sign(payload, secretKey);
};

const decodeJWT = (token: string) => {
  const payload = jwt.verify(token, process.env.APP_SECRET_KEY);
  return payload;
};

export const isUserAuthorized = async (req: any, res: any, next: any) => {
  try {
    // get token to decode data, you can use "npm passport" package instead
    const token = req.header("Authorization").replace("Bearer ", "");
    const data: any = decodeJWT(token);
    const user = await userService.findById(data.id);
    if (!user || !user.document) {
      return next(
        new BaseError({
          statusCode: 401,
          message: "cannot authorized this access token",
        })
      );
    }
    req.user = user.document;
    return next();
    // const user = await
  } catch (error) {
    console.log("error", error);
    return next(
      new BaseError({
        statusCode: 401,
        message: "cannot authorized this access token",
      })
    );
  }
};

export const isAdminAuthorized = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data: any = decodeJWT(token);
    const admin = await adminService.findById(data.id);
    if (!admin || !admin.document) {
      return next(
        new BaseError({
          statusCode: 401,
          message: "cannot authorized this access token",
        })
      );
    }
    req.admin = admin.document;
    return next();
  } catch (error) {
    console.log("error", error);
    return next(
      new BaseError({
        statusCode: 401,
        message: "cannot authorized this access token",
      })
    );
  }
};
