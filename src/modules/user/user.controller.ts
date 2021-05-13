import bcrypt from "bcrypt";
import { BaseError, BaseResponse } from "../../commons";
import { IUser, IUserFilterByAdmin } from "./user.interface";
import { userService } from "./user.service";

export const userController = {
  user: {
    getUserInfo: async (req: any, res: any, next: any) => {
      try {
        return new BaseResponse({
          statusCode: 200,
          data: { ...req.user },
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
        return new BaseResponse({ statusCode: 200, data: newUser }).return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
  admin: {
    getList: async (req: any, res: any, next: any) => {
      try {
        const { page, pageSize, ...query }: IUserFilterByAdmin = req.query;
        const skip = pageSize * (page - 1);
        const [total, userList] = await Promise.all([
          userService.count(query),
          userService.find(query, { skip, limit: pageSize }),
        ]);
        return new BaseResponse({ statusCode: 200, data: userList })
          .addMeta({ total })
          .return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
};
