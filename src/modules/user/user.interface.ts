import { IBaseQuery } from "../../commons";

// use for mongoose schema
export interface IUserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: TGender;
  isActive: boolean;
  verifyCode: string;
  createdAt: string;
  updatedAt: string;
  status: TUserStatus;
}

export interface IUser extends IUserCreate {
  id: string;
}
// use for other
export type TUserStatus = "active" | "disabled";

export type TGender = "male" | "female" | "unknown";

export interface IUserFilter {
  id?: string;
  email?: string;
  phoneNumber?: string;
  isActive?: boolean;
  status?: TUserStatus;
  createdFrom?: Date;
  createdTo?: Date;
}

export interface IUserFilterByAdmin extends IUserFilter, IBaseQuery {}
