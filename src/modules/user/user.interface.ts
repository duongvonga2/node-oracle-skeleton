// use for mongoose schema
export interface IUserDocument {
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
export interface IUser extends IUserDocument {
  _id: string;
}

export type TUserStatus = "active" | "disabled";

export type TGender = "male" | "female" | "unknown";
