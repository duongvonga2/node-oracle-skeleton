import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IAdmin } from "./admin.interface";

interface IAdminDocument extends IAdmin, Document {}
// Schema
const AdminSchema = new Schema<IAdminDocument>(
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
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("save", function (next) {
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

export default model("admins", AdminSchema);
