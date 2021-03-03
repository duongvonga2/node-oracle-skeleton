import Joi from "joi";

export const userValidation = {
  user: {
    changePassword: Joi.object().keys({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().min(8).required(),
    }),
  },
};
