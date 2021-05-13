import { BaseError, BaseResponse, IBaseOracleDocument } from "../../commons";
import { IAdmin, IAdminQuery, IAdminUpdatePassword } from "./admin.interface";
import { adminService } from "./admin.service";
import bcrypt from "bcrypt";

export const adminController = {
  admin: {
    getList: async (req: any, res: any, next: any) => {
      try {
        const { pageSize, page, ...query }: IAdminQuery = req.query;
        const limit = pageSize || 20;
        const skip = page ? (page - 1) * pageSize : 0;
        const [total, adminList] = await Promise.all([
          adminService.count(query),
          adminService.find({ ...query }, { limit, skip }),
        ]);
        adminList.forEach((admin) => {
          if (admin.document && admin.document.password) {
            delete admin.document.password;
          }
        });
        return new BaseResponse<IBaseOracleDocument<IAdmin>[]>({
          statusCode: 200,
          data: adminList,
        })
          .addMeta({ total })
          .return(res);
      } catch (error) {
        return next(error);
      }
    },
    changePassword: async (req: any, res: any, next: any) => {
      try {
        const { oldPassword, newPassword }: IAdminUpdatePassword = req.body;
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
        if (newAdmin && newAdmin.document && newAdmin.document.password) {
          delete newAdmin.document.password;
        }
        return new BaseResponse<IBaseOracleDocument<IAdmin>>({
          statusCode: 200,
          data: newAdmin,
        }).return(res);
      } catch (error) {
        return next(error);
      }
    },
    updateInfo: async (req: any, res: any, next: any) => {
      try {
        const admin = await adminService.findById(req.admin.id);
        const adminDocument: any = admin.document;

        for (const key in req.body) {
          adminDocument[key] = req.body[key];
        }
        console.log("admin document", adminDocument);
        const newAdmin = await adminService.findByIdAndUpdate(
          req.admin.id,
          adminDocument
        );
        if (newAdmin && newAdmin.document && newAdmin.document.password) {
          delete newAdmin.document.password;
        }
        return new BaseResponse<IBaseOracleDocument<IAdmin>>({
          statusCode: 200,
          data: { ...newAdmin, document: adminDocument },
        }).return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
};
