import Joi from "joi";
import { IAdmin, IAdminQuery } from "./admin.interface";

export const adminValidation = {
  admin: {
    get: Joi.object<IAdminQuery>().keys({
      pageSize: Joi.number().integer().min(1),
      page: Joi.number().integer().min(1),
      sort: Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      createdFrom: Joi.date().iso(),
      createdTo: Joi.date().iso(),
    }),
  },
};
