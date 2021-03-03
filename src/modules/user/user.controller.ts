import bcrypt from "bcrypt";
import { BaseError, BaseResponse, genRandomString } from "../../commons";
import { IUser } from "./user.interface";
import { userService } from "./user.service";

export const userController = {
  user: {
    getUserInfo: async (req: any, res: any, next: any) => {
      try {
        return new BaseResponse({ statusCode: 200, data: {} }).return(res);
      } catch (error) {
        return next(error);
      }
    },
    changePassword: async (req: any, res: any, next: any) => {
      try {
        const { oldPassword, newPassword } = req.body;
        const user: IUser = req.user;
        console.log("user", user);
        const currentUser = await userService.findOne(
          { _id: user._id },
          "+password"
        );
        const isRightPassword = bcrypt.compareSync(
          oldPassword,
          currentUser.password
        );
        if (!isRightPassword) {
          return new BaseError({
            statusCode: 400,
            errors: { oldPassword: "wrongPassword" },
            message: "Mật khẩu không đúng",
          }).return(res);
        }
        currentUser.password = newPassword;
        await currentUser.save();
        const { password, ...other } = currentUser.toJSON();
        return new BaseResponse({ statusCode: 200, data: other }).return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
};
