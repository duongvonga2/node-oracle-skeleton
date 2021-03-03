export interface IAdmin {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminQuery extends IAdmin {
  pageSize: number;
  page: number;
  sort: string;
  createdFrom: Date;
  createdTo: Date;
}
