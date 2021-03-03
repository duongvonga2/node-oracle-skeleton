export interface IAdminDocument {
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
export interface IAdmin extends IAdminDocument {
  _id?: string;
}

export interface IAdminQuery extends IAdmin {
  pageSize: number;
  page: number;
  sort: string;
  createdFrom: Date;
  createdTo: Date;
}
