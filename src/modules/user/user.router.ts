import { Router } from "express";
import { isUserAuthorized, validate } from "../../commons";
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

router.use("/user", isUserAuthorized, user);
router.use("/admin", admin);

export { router as userRouter };
