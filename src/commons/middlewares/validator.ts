import Joi from "joi";
import { BaseError } from "../utils";
import { TReqField } from "./interface";

export const validate = (
  reqField: TReqField,
  validateSchema: Joi.ObjectSchema
) => (req: any, res: any, next: any) => {
  const data = req[reqField];
  const { error, value } = validateSchema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (error) {
    const { errors, message } = getError(error);
    return new BaseError({ statusCode: 400, errors, message }).return(res);
  }
  req[reqField] = value;
  return next();
};

const getError = (error: Joi.ValidationError) => {
  const errors: any = {};
  const message: any = {};
  const errorDetails = error.details;
  errorDetails.forEach((err) => {
    errors[err.context.label] = err.type;
    if (err.context.limit) {
      errors[err.context.label] = err.type + "." + err.context.limit;
    }
    message[err.context.label] = err.message;
  });
  return { errors, message };
};
