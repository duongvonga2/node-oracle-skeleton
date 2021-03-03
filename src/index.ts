// tslint:disable:no-console
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { join } from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase, errorHandler, morganCustom } from "./commons";
import { router } from "./modules/router";
import { adminService } from "./modules/admin";

dotenv.config();

connectDatabase();

const app = express();
app.use("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.set("assets", join(__dirname, "../assets"));

app.use("/api", morganCustom, router);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(errorHandler.catcher, errorHandler.handler);

(async () => {
  const admin = await adminService.findOne({ email: "duongvonga2@gmail.com" });
  if (!admin) {
    await adminService.create({
      email: "duongvonga2@gmail.com",
      firstName: "Admin",
      lastName: "Root",
      password: "admin.123",
      phoneNumber: "0917717706",
      isActive: true,
    });
    console.log("init admin success");
  }
})();

const port = process.env.PORT; // default port to listen

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
