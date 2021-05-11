// tslint:disable:no-console
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { join } from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { oracleDB, errorHandler, morganCustom } from "./commons";
import { router } from "./modules/router";
import { adminService } from "./modules/admin";
import { userService } from "./modules/user";

dotenv.config();

const app = express();

const initAdmin = async () => {
  const admin = await adminService.findOne({ email: "duongvonga2@gmail.com" });
  if (!admin) {
    await adminService.insertOne({
      email: "xxx@gmail.com",
      firstName: "Admin",
      lastName: "Root",
      password: "admin.123",
      phoneNumber: "xxxxx",
      isActive: true,
      status: "active",
    });
    console.log("init admin success");
  }
};

const init = async () => {
  try {
    const connection = await oracleDB.connectDB({
      user: "sys",
      password: "password",
      connectString: ` (DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
      (CONNECT_DATA =
        (SERVER = DEDICATED)
        (SERVICE_NAME = ORCL)
        (SID=orclcd)
      )
    )
    `,
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
