import Joi from "joi";
import { IAdmin } from "../admin";
import { IUser } from "../user";

export const authValidation = {
  user: {
    register: Joi.object<IUser>().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).trim().required(),
      password: Joi.string().min(8).required(),
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      gender: Joi.string().trim(),
    }),
    login: Joi.object<IUser>().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().min(8).required(),
    }),
    verify: Joi.object().keys({
      token: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
    }),
  },
  admin: {
    login: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().min(8).required(),
    }),
  },
};
