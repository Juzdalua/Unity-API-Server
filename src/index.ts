import express, { Request, Response } from "express";
import "dotenv/config";
import { rootRouter } from "./router/rootRouter";
import connection from "./utils/database";

const mainAPI = async () => {
  const app = express();
  const PORT = process.env.PORT ?? 4000;
  const conn = connection;
  await conn.getConnection();

  app.use("/", rootRouter);

  app.listen(PORT, () => {
    console.log(`🚀 Connect PORT: ${PORT}. ✅`);
  });
};

mainAPI();