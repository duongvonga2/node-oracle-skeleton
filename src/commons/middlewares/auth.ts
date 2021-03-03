import jwt from "jsonwebtoken";
import { BaseError } from "../utils";

export const genJWT = (payload: any) => {
  const secretKey = process.env.APP_SECRET_KEY;

  return jwt.sign(payload, secretKey);
};

const decodeJWT = (token: string) => {
  const payload = jwt.verify(token, process.env.APP_SECRET_KEY);
  return payload;
};

export const isUserAuthorized = (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data: any = decodeJWT(token);

    if (!data || data.role !== "user" || !data._id) {
      return next(
        new BaseError({
          statusCode: 401,
          message: "cannot authorized this access token",
        })
      );
    }
    req.user = data;
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

export const isAdminAuthorized = (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data: any = decodeJWT(token);

    if (!data || data.role !== "admin" || !data._id) {
      return next(
        new BaseError({
          statusCode: 401,
          message: "cannot authorized this access token",
        })
      );
    }
    req.admin = data;
    return next();
  } catch (error) {
    return next(
      new BaseError({
        statusCode: 401,
        message: "cannot authorized this access token",
      })
    );
  }
};
