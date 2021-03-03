import { BaseError, IBaseError, logger } from "../utils";

const catcher = (req: any, res: any, next: any) => {
  next(new BaseError({ statusCode: 404, message: "api not found" }));
};

const handler = (error: IBaseError, req: any, res: any, next: any) => {
  console.log("error", error);

  if (req.user) {
    error.user_id = req.user._id;
  }
  if (req.admin) {
    error.admin = req.admin._id;
  }
  logger.error(error);
  if (error instanceof BaseError && error.statusCode) {
    res.status(error.statusCode).json(error);
  } else {
    res.status(500).json(new BaseError({ statusCode: 500, ...error }));
  }
};

export const errorHandler = {
  catcher,
  handler,
};
