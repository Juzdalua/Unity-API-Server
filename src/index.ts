import express, { Request, Response } from 'express';
import 'dotenv/config';
import connection from './utils/database';
import { rootRouter } from './router/rootRouter';
import { accountRouter } from './router/accountRouter';
import { playerRouter } from './router/playerRouter';

const mainAPI = async () => {
  const app = express();
  const PORT = process.env.PORT ?? 4000;
  const conn = connection;
  await conn.getConnection();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', rootRouter);
  app.use('/account', accountRouter);
  app.use('/player', playerRouter);

  app.listen(PORT, () => {
    console.log(`🚀 Connect PORT: ${PORT}. ✅`);
  });
};

mainAPI();
