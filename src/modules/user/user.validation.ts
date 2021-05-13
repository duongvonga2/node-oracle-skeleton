import Joi from "joi";
import { IUserFilterByAdmin } from "./user.interface";

export const userValidation = {
  user: {
    changePassword: Joi.object().keys({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().min(8).required(),
    }),
  },
  admin: {
    getList: Joi.object<IUserFilterByAdmin>().keys({
      page: Joi.number().required(),
      pageSize: Joi.number().required(),
      email: Joi.string(),
      isActive: Joi.boolean(),
      status: Joi.string().valid("disabled", "active"),
      createdFrom: Joi.date().iso(),
      createdTo: Joi.date().iso(),
    }),
  },
};
