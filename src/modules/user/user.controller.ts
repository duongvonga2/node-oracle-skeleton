import { BaseResponse } from "../../commons";

export const userController = {
  user: {
    getUserInfo: async (req: any, res: any, next: any) => {
      try {
        return new BaseResponse({ statusCode: 200, data: {} }).return(res);
      } catch (error) {
        return next(error);
      }
    },
  },
};
