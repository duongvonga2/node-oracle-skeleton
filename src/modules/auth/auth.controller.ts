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
        if (existedUser) {
          return new BaseError({
            statusCode: 400,
            errors: { email: errors.auth.userAlreadyExisted },
          })
            .addMeta({ message: "Email đã được sử dụng" })
            .return(res);
        }

        const data: IUser = req.body;
        data.verifyCode = genRandomString(10);

        const user = await userService.create(data);

        sendMailToVerify(user.email, user.verifyCode);

        const { password, verifyCode, ...other } = user.toJSON();
        return new BaseResponse({ statusCode: 200, data: other }).return(res);
      } catch (error) {
        return next(error);
      }
    },
    login: async (req: any, res: any, next: any) => {
      try {
        const { email, password } = req.body;
        const user = await userService.findOne({ email }, "+password");
        if (!user) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.loginFail },
          })
            .addMeta({ message: "Đăng nhập thất bại, sai email hoặc mật khẩu" })
            .return(res);
        }

        const isAccess = bcrypt.compareSync(password, user.password);
        if (!isAccess) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.loginFail },
            message: "Đăng nhập thất bại, sai email hoặc mật khẩu",
          }).return(res);
        }

        const payload = {
          _id: user._id,
          email: user.email,
          role: "user",
        };
        const token = genJWT(payload);
        const data = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          isActive: user.isActive,
        };
        return new BaseResponse({
          statusCode: 200,
          data: { ...data, token },
        }).return(res);
      } catch (error) {
        return next(error);
      }
    },
    verifyUser: async (req: any, res: any, next: any) => {
      try {
        const { token, email } = req.query;
        const user = await userService.findOne({ email }, "+verifyCode");
        if (!user) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.notBeenVerified },
          })
            .addMeta({ message: "user not verified" })
            .return(res);
        }

        const isVerify = bcrypt.compareSync(user.verifyCode, token);
        if (!isVerify) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.notBeenVerified },
          })
            .addMeta({ message: "user is not verified" })
            .return(res);
        }

        user.isActive = true;
        user.status = "active";
        await user.save();
        return new BaseResponse({ statusCode: 200, data: {} })
          .addMeta({ message: "account is activated" })
          .return(res);
      } catch (error) {
        return next(error);
      }
    },
    resetPassword: async (req: any, res: any, next: any) => {
      try {
        const { email } = req.body;
        const user = await userService.findOne({ email });
        if (!user) {
          return new BaseError({
            statusCode: 400,
            errors: { email: errors.auth.userNotFound },
          }).return(res);
        }
        const newPassword = genRandomString(10);
        user.password = newPassword;
        await user.save();
        sendMailToResetPassword(email, newPassword);
        return new BaseResponse({ statusCode: 200, data: {} })
          .addMeta({ message: "Reset password thành công, hãy kiểm tra email" })
          .return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
  admin: {
    login: async (req: any, res: any, next: any) => {
      try {
        const { email, password } = req.body;
        const admin = await adminService.findOne({ email }, "+password");
        if (!admin) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.loginFail },
          })
            .addMeta({ message: "Đăng nhập thất bại, sai email hoặc mật khẩu" })
            .return(res);
        }

        const isAccess = bcrypt.compareSync(password, admin.password);
        if (!isAccess) {
          return new BaseError({
            statusCode: 400,
            errors: { user: errors.auth.loginFail },
            message: "Đăng nhập thất bại, sai email hoặc mật khẩu",
          }).return(res);
        }

        const payload = {
          _id: admin._id,
          email: admin.email,
          role: "admin",
        };
        const token = genJWT(payload);
        const data = {
          _id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
        };
        return new BaseResponse({
          statusCode: 200,
          data: { ...data, token },
        }).return(res);
      } catch (error) {
        return next(error);
      }
    },
    resetPassword: async (req: any, res: any, next: any) => {
      try {
        const { email } = req.body;
        const admin = await adminService.findOne({ email });
        if (!admin) {
          return new BaseError({
            statusCode: 400,
            errors: { email: errors.auth.adminNotFound },
          }).return(res);
        }
        const newPassword = genRandomString(10);
        admin.password = newPassword;
        await admin.save();
        sendMailToResetPassword(email, newPassword);
        return new BaseResponse({ statusCode: 200, data: {} })
          .addMeta({
            message: "Reset password thành công, xin hãy kiểm tra email",
          })
          .return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
};
