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
adminRouter.post(
  "/login",
  validate("body", authValidation.admin.login),
  authController.admin.login
);

router.use("/user", userRouter);
router.use("/admin", adminRouter);

export { router as authRouter };
