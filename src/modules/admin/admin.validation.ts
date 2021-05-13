import Joi from "joi";
import {
  IAdmin,
  IAdminQuery,
  IAdminUpdate,
  IAdminUpdatePassword,
} from "./admin.interface";

export const adminValidation = {
  admin: {
    get: Joi.object<IAdminQuery>().keys({
      pageSize: Joi.number().integer().min(1),
      page: Joi.number().integer().min(1),
      email: Joi.string().email({ minDomainSegments: 2 }),
    }),
    changePassword: Joi.object<IAdminUpdatePassword>().keys({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().min(8).required(),
    }),
    updateInfo: Joi.object<IAdminUpdate>().keys({
      firstName: Joi.string().trim(),
      lastName: Joi.string().trim(),
      phoneNumber: Joi.string().trim(),
    }),
  },
};
