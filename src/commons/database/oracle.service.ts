import oracledb, { Connection, SodaDatabase } from "oracledb";
import { logger } from "../utils";

interface IOracleDBConstructor {
  user: string;
  password: string;
  connectString: string;
}

class OracleDB {
  connection: Connection;
  soda: SodaDatabase;

  async connectDB(data: IOracleDBConstructor) {
    const { connectString, password, user } = data;
    try {
      const connection = await oracledb.getConnection({
        user,
        password,
        connectString,
      });
      this.connection = connection;
      this.soda = connection.getSodaDatabase();
      return true;
    } catch (error) {
      // console.log("error", error);
      logger.error(error);
      throw error;
    }
  }
}
export const oracleDB = new OracleDB();
