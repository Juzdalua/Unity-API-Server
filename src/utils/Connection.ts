import mysql, { QueryResult } from "mysql2/promise";
import "dotenv/config";

class Connection {
  host: string = process.env.DATABASE_HOST as string;
  user: string = process.env.DATABASE_USER as string;
  password: string = process.env.DATABASE_PASSWORD as string;
  database: string = process.env.DATABASE_DB as string;
  instance: any;

  constructor() {}

  async getConnection() {
    try {
      this.instance = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
      });
      console.log(`🚀 DB Connect Success. ✅`);
    } catch (error) {
      console.log(`🚀 DB Connect Error. ❌`);
      console.log(error);
    }
  }

  async getQuery(query: string) {
    try {
      const [rows, fields] = await this.instance.query(query);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async endConnection() {
    await this.instance.end();
  }
}

export default Connection;