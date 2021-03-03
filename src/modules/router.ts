import { Router } from "express";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);

// export default router;
