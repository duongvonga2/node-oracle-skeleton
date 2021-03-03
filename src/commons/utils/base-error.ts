export class BaseError extends Error {
  statusCode: number;
  error: number;
  errors: { [key: string]: any };
  message: string;
  constructor({ statusCode, error, errors, message }: IBaseError) {
    super();
    if (!statusCode) {
      throw new Error("create error failure");
    }
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
    this.errors = errors;
  }
  addMeta(meta: { [key: string]: any }) {
    Object.assign(this, meta);
    if (!this.message) this.message = "";
    return this;
  }
  return(res: any) {
    return res.status(this.statusCode).json(this);
  }
}
// export default BaseError;

export interface IBaseError {
  statusCode: number;
  error?: number;
  errors?: { [key: string]: any };
  message?: string;
  [key: string]: any;
}
