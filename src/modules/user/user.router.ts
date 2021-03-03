import { Router } from "express";
import { isUserAuthorized } from "../../commons";
import { userController } from "./user.controller";

const router = Router();
const user = Router();
const admin = Router();

user.get("/info", userController.user.getUserInfo);

router.use("/user", isUserAuthorized, user);
router.use("/admin", admin);

export { router as userRouter };
