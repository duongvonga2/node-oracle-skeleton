import { BaseResponse } from "../../commons";
import { adminService } from "./admin.service";

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
  },
};
