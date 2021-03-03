import { Document, model, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";

interface UserDocument extends IUser, Document {}
// Schema
const UserSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    if (!this.password) {
      return next();
    }
    try {
      this.password = bcrypt.hashSync(this.password, 10);
      return next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

export default model("users", UserSchema);
