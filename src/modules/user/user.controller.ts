import bcrypt from "bcrypt";
import { BaseError, BaseResponse, IBaseOracleDocument } from "../../commons";
import { sendMailToResetPassword } from "../auth";
import { userHandler } from "./user.handler";
import { IUser, IUserFilterByAdmin } from "./user.interface";
import { userService } from "./user.service";

export const userController = {
  user: {
    getUserInfo: async (req: any, res: any, next: any) => {
      try {
        const user = await userService.findById(req.user.id);
        if (user && user.document && user.document.password) {
          delete user.document.password;
        }
        // const { password, ...data } = user;
        return new BaseResponse<IBaseOracleDocument<IUser>>({
          statusCode: 200,
          data: user,
        }).return(res);
      } catch (error) {
        return next(error);
      }
    },
    changePassword: async (req: any, res: any, next: any) => {
      try {
        const { oldPassword, newPassword } = req.body;
        const user: IUser = req.user;

        const currentUser = await userService.findById(user.id);
        const userDocument = currentUser.document;
        const isRightPassword = bcrypt.compareSync(
          oldPassword,
          userDocument.password
        );
        if (!isRightPassword) {
          return new BaseError({
            statusCode: 400,
            errors: { oldPassword: "wrongPassword" },
            message: "Mật khẩu không đúng",
          }).return(res);
        }
        userDocument.password = bcrypt.hashSync(newPassword, 10);
        const newUser = await userService.findByIdAndUpdate(
          user.id,
          userDocument
        );
        if (newUser && newUser.document && newUser.document.password) {
          delete newUser.document.password;
        }
        return new BaseResponse<IBaseOracleDocument<IUser>>({
          statusCode: 200,
          data: newUser,
        }).return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
  admin: {
    getList: async (req: any, res: any, next: any) => {
      try {
        const { page, pageSize, ...query }: IUserFilterByAdmin = req.query;
        const filterSpec = userHandler.handler.getQuerySpec(query);
        const skip = pageSize * (page - 1);
        const [total, userList] = await Promise.all([
          userService.count(filterSpec),
          userService.find(filterSpec, { skip, limit: pageSize }),
        ]);
        userList.forEach((user) => {
          if (user.document && user.document.password) {
            delete user.document.password;
          }
        });
        return new BaseResponse<IBaseOracleDocument<IUser>[]>({
          statusCode: 200,
          data: userList,
        })
          .addMeta({ total })
          .return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
};
