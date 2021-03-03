import { BaseError, BaseResponse } from "../../commons";
import { IAdmin } from "./admin.interface";
import { adminService } from "./admin.service";
import bcrypt from 'bcrypt'

export const adminController = {
  admin: {
    getList: async (req: any, res: any, next: any) => {
      try {
        const { pageSize, page, sort, ...query } = req.query;
        const limit = pageSize || 20;
        const skip = page ? (page - 1) * pageSize : 0;
        console.log("query", query);
        const adminList = await adminService.find(
          query,
          {},
          { limit, skip, sort }
        );
        return new BaseResponse({ statusCode: 200, data: adminList }).return(
          res
        );
      } catch (error) {
        return next(error);
      }
    },
    changePassword: async(req: any, res: any, next:any) => {
      try {
        const { oldPassword, newPassword } = req.body;
        const admin: IAdmin = req.admin;
        const currentAdmin = await adminService.findOne(
          { _id: admin._id },
          "+password"
        );
        const isRightPassword = bcrypt.compareSync(
          oldPassword,
          currentAdmin.password
        );
        if (!isRightPassword) {
          return new BaseError({
            statusCode: 400,
            errors: { oldPassword: "wrongPassword" },
            message: "Mật khẩu không đúng",
          }).return(res);
        }
        currentAdmin.password = newPassword;
        await currentAdmin.save();
        const { password, ...other } = currentAdmin.toJSON();
        return new BaseResponse({ statusCode: 200, data: other }).return(res);
      } catch (error) {
        return next(error);
      }
    }
  },
};
