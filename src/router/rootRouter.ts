import express, { NextFunction, Request, Response } from "express";
import connection from "../utils/database";

export const rootRouter = express.Router();

rootRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  
  const result = await connection.getQuery(`SELECT * FROM User;`);
  console.log(result);

  res.send("root router");
});