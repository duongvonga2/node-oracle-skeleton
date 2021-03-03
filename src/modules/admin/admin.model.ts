import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IAdminDocument } from "./admin.interface";

interface AdminDocument extends IAdminDocument, Document {}
// Schema
const AdminSchema = new Schema<AdminDocument>(
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
    status: {
      type: String,
      default: "disabled",
      enum: ["active", "disabled"],
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
