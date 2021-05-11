import { BaseError, BaseResponse } from "../../commons";
import { IAdmin } from "./admin.interface";
import { adminService } from "./admin.service";
import bcrypt from "bcrypt";

export const adminController = {
  admin: {
    getList: async (req: any, res: any, next: any) => {
      try {
        const { pageSize, page, sort, ...query } = req.query;
        const limit = pageSize || 20;
        const skip = page ? (page - 1) * pageSize : 0;
        const [total, adminList] = await Promise.all([
          adminService.count(query),
          adminService.find({ ...query }, { limit, skip }),
        ]);
        return new BaseResponse({ statusCode: 200, data: adminList })
          .addMeta({ total })
          .return(res);
      } catch (error) {
        return next(error);
      }
    },
    changePassword: async (req: any, res: any, next: any) => {
      try {
        const { oldPassword, newPassword } = req.body;
        const admin: IAdmin = req.admin;
        const currentAdmin = await adminService.findById(admin.id);
        const adminDocument = currentAdmin.document;
        const isRightPassword = bcrypt.compareSync(
          oldPassword,
          adminDocument.password
        );
        if (!isRightPassword) {
          return new BaseError({
            statusCode: 400,
            errors: { oldPassword: "wrongPassword" },
            message: "Mật khẩu không đúng",
          }).return(res);
        }
        adminDocument.password = bcrypt.hashSync(newPassword, 10);
        const newAdmin = await adminService.findByIdAndUpdate(
          admin.id,
          adminDocument
        );
        return new BaseResponse({ statusCode: 200, data: newAdmin }).return(
          res
        );
      } catch (error) {
        return next(error);
      }
    },
  },
};
