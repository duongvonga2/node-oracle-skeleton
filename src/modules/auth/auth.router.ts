import { Router } from "express";
import { validate } from "../../commons/middlewares";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";

const router = Router();
const userRouter = Router();
const adminRouter = Router();

userRouter.post(
  "/register",
  validate("body", authValidation.user.register),
  authController.user.register
);
userRouter.post(
  "/login",
  validate("body", authValidation.user.login),
  authController.user.login
);
userRouter.get(
  "/verify",
  validate("query", authValidation.user.verify),
  authController.user.verifyUser
);
userRouter.post(
  "/reset-password",
  validate("body", authValidation.user.resetPassword),
  authController.user.resetPassword
);

adminRouter.post(
  "/login",
  validate("body", authValidation.admin.login),
  authController.admin.login
);
adminRouter.post(
  "/reset-password",
  validate("body", authValidation.admin.resetPassword),
  authController.admin.resetPassword
);

router.use("/user", userRouter);
router.use("/admin", adminRouter);

export { router as authRouter };
