export interface IAdmin {
  id?: string;
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  status: TAdminStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TAdminStatus = "active" | "disabled";
export interface IAdminQuery extends IAdmin {
  pageSize: number;
  page: number;
  sort: string;
  createdFrom: Date;
  createdTo: Date;
}

export interface IAdminDocument<T> {
  id: string;
  createdOn: string;
  lastModified: string;
  document: Record<keyof IAdmin, any>;
}

export interface IAdminFilter {
  id?: string;
  email?: string;
  phoneNumber?: string;
  isActive?: boolean;
  status?: TAdminStatus;
}