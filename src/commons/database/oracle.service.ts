import oracledb, {
  Connection,
  ConnectionAttributes,
  SodaDatabase,
} from "oracledb";
import { logger } from "../utils";

// auto commit document after insert record
oracledb.autoCommit = true;
interface IOracleDBConstructor {
  user: string;
  password: string;
  connectString: string;
}

class OracleDB {
  connection: Connection;
  soda: SodaDatabase;

  async connectDB(data: ConnectionAttributes) {
    try {
      const connection = await oracledb.getConnection({
        ...data,
      });
      this.connection = connection;
      this.soda = connection.getSodaDatabase();
      return connection;
    } catch (error) {
      // console.log("error", error);
      logger.error(error);
      throw error;
    }
  }
}
export const oracleDB = new OracleDB();
export const sysdbaNumber = oracledb.SYSDBA;
