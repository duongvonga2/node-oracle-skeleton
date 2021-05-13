import { IBaseQuery } from "../../commons";

export interface IAdminCreate {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  status: TAdminStatus;
  createdAt: string;
  updatedAt: string;
}
export interface IAdmin extends IAdminCreate {
  id: string;
}

export type TAdminStatus = "active" | "disabled";
export interface IAdminDocument<T> {
  id: string;
  createdOn: string;
  lastModified: string;
  document: T;
  // document: IAdmin;
}

export interface IAdminFilter {
  id?: string;
  email?: string;
  phoneNumber?: string;
  isActive?: boolean;
  status?: TAdminStatus;
}

export interface IAdminQuery extends IBaseQuery, IAdminFilter {}

export interface IAdminUpdate {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  updatedAt?: string;
}

export interface IAdminUpdatePassword {
  oldPassword: string;
  newPassword: string;
}
