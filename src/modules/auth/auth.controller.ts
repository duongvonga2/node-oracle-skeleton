import bcrypt from "bcrypt";
import {
  errors,
  genJWT,
  BaseError,
  BaseResponse,
  genRandomString,
} from "../../commons";
import { adminService } from "../admin";
import { IUser, userService } from "../user";
import { sendMailToResetPassword, sendMailToVerify } from "./auth.service";

export const authController = {
  user: {
    register: async (req: any, res: any, next: any) => {
      try {
        const { email } = req.body;
        const existedUser = await userService.findOne({ email });
        if (existedUser.document) {
          return new BaseError({
            statusCode: 400,
            errors: { email: errors.auth.userAlreadyExisted },
          })
            .addMeta({ message: "Email đã được sử dụng" })
            .return(res);
        }

        const data: IUser = {
          ...req.body,
          isActive: true,
          password: bcrypt.hashSync(req.body.password, 10),
        };

        const user = await userService.insertOne(data);

        return new BaseResponse({ statusCode: 200, data: user }).return(res);
      } catch (error) {
        return next(error);
      }
    },
    login: async (req: any, res: any, next: any) => {
      try {
        const { email, password } = req.body;
        const user = await userService.findOne({ email });
        if (!user || !user.document) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.loginFail },
          })
            .addMeta({ message: "Đăng nhập thất bại, sai email hoặc mật khẩu" })
            .return(res);
        }
        const userDocument = user.document;

        const isAccess = bcrypt.compareSync(password, userDocument.password);
        if (!isAccess) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.loginFail },
            message: "Đăng nhập thất bại, sai email hoặc mật khẩu",
          }).return(res);
        }

        const payload = {
          _id: userDocument.id,
          email: userDocument.email,
          role: "user",
        };
        const token = genJWT(payload);
        const data = {
          _id: userDocument.id,
          email: userDocument.email,
          firstName: userDocument.firstName,
          lastName: userDocument.lastName,
          gender: userDocument.gender,
          isActive: userDocument.isActive,
        };
        return new BaseResponse({
          statusCode: 200,
          data: { ...data, token },
        }).return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
  admin: {
    login: async (req: any, res: any, next: any) => {
      try {
        const { email, password } = req.body;
        const admin = await adminService.findOne({ email });
        if (!admin || !admin.document) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.loginFail },
          })
            .addMeta({ message: "Đăng nhập thất bại, sai email hoặc mật khẩu" })
            .return(res);
        }

        const isAccess = bcrypt.compareSync(password, admin.document.password);
        if (!isAccess) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.loginFail },
            message: "Đăng nhập thất bại, sai email hoặc mật khẩu",
          }).return(res);
        }

        const adminDocument = admin.document;

        const payload = {
          _id: adminDocument.id,
          email: adminDocument.email,
          role: "admin",
        };
        const token = genJWT(payload);
        const data = {
          _id: adminDocument.id,
          email: adminDocument.email,
          firstName: adminDocument.firstName,
          lastName: adminDocument.lastName,
        };
        return new BaseResponse({
          statusCode: 200,
          data: { ...data, token },
        }).return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
};
