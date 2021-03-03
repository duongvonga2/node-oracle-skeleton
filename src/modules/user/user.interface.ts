export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: TGender;
  isActive: boolean;
  verifyCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TGender = "male" | "female" | "unknown";
