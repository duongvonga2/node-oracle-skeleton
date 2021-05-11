import { IBaseQuery } from "../../commons";

// use for mongoose schema
export interface IUser {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: TGender;
  isActive: boolean;
  verifyCode: string;
  createdAt: Date;
  updatedAt: Date;
  status: TUserStatus;
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
}

export interface IUserFilterByAdmin extends IUserFilter, IBaseQuery {}
