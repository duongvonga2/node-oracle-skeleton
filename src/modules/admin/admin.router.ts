import { Router } from "express";
import { isAdminAuthorized, validate } from "../../commons";
import { adminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";

const router = Router();
// const user = Router();
const admin = Router();

admin.get(
  "/",
  validate("query", adminValidation.admin.get),
  adminController.admin.getList
);
admin.put(
  "/change-password",
  validate("body", adminValidation.admin.changePassword),
  adminController.admin.changePassword
);
admin.put(
  "/update-info",
  validate("body", adminValidation.admin.updateInfo),
  adminController.admin.updateInfo
);

router.use("/admin", isAdminAuthorized, admin);

export { router as adminRouter };
