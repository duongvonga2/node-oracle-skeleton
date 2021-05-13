import { Router } from "express";
import { isAdminAuthorized, isUserAuthorized, validate } from "../../commons";
import { adminController } from "../admin";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = Router();
const user = Router();
const admin = Router();

user.get("/info", userController.user.getUserInfo);
user.post(
  "/change-password",
  validate("body", userValidation.user.changePassword),
  userController.user.changePassword
);

admin.get(
  "/get-list",
  validate("query", userValidation.admin.getList),
  adminController.admin.getList
);

router.use("/user", isUserAuthorized, user);
router.use("/admin", isAdminAuthorized, admin);

export { router as userRouter };
