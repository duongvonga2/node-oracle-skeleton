// tslint:disable:no-console
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { join } from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { oracleDB, errorHandler, morganCustom, sysdbaNumber } from "./commons";
import { router } from "./modules/router";
import { adminService } from "./modules/admin";
import { userService } from "./modules/user";

dotenv.config();

const app = express();

const initAdmin = async () => {
  // const admin = await adminService.findOne({ email: "xxx@gmail.com" });
  const admin = await adminService.findOne({ email: "xxx@gmail.com" });
  if (admin) {
    console.log("admin", admin);
  }
  if (!admin) {
    const newAdmin = await adminService.insertOne({
      email: "xxx@gmail.com",
      firstName: "Admin",
      lastName: "Root",
      password: "admin.123",
      phoneNumber: "xxxxx",
      isActive: true,
      status: "active",
    } as any);
    console.log("init admin success", newAdmin);
  }
};

const init = async () => {
  try {
    const connection = await oracleDB.connectDB({
      user: "sys",
      password: "password",
      connectString: "localhost:1521/orcl",
      privilege: sysdbaNumber, // as the role in sqldeverloper tool
    });

    await adminService.init();
    await userService.init();
    app.use("*", cors());
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    app.set("assets", join(__dirname, "../assets"));

    app.use("/api", morganCustom, router);

    app.use(json());
    app.use(urlencoded({ extended: true }));
    initAdmin();
    app.use(errorHandler.catcher, errorHandler.handler);
  } catch (error) {
    console.log("error", error);
  }
};

init();

const port = process.env.PORT; // default port to listen

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
