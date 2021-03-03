export class BaseResponse<T> {
  statusCode: number;
  data: T;
  constructor({ statusCode, data }: IBaseResponse<T>) {
    this.statusCode = statusCode;
    this.data = data;
  }

  addMeta(meta: { [key: string]: any }) {
    Object.assign(this, meta);
    return this;
  }

  return(res: any) {
    return res.status(this.statusCode).json(this);
  }
}
// export default BaseResponse;

export interface IBaseResponse<T> {
  statusCode: number;
  data: T;
  [key: string]: any;
}
