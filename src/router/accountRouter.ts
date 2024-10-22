import express, { NextFunction, Request, Response } from 'express';
import connection from '../utils/database';
import { AccountDTO } from '../interface/account.dto';
import { createErrorResponse } from '../utils/ErrorResponse';

export const accountRouter = express.Router();

accountRouter.post('/signup', async (req: Request<{}, {}, AccountDTO>, res: Response, next: NextFunction): Promise<any> => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(401).json(createErrorResponse(-1, 'Invalid Access'));

  const result = await connection.getQuery(`
    SELECT
      id
    FROM
      account
    WHERE
      name = '${name}' 
    `);

  if (result.length > 0) return res.status(401).json(createErrorResponse(-2, 'Name Already exists.'));
    
  
  return res.status(401).json(createErrorResponse(-3, 'Invalid Name'));
});

accountRouter.post('/signin', async (req: Request<{}, {}, AccountDTO>, res: Response, next: NextFunction): Promise<any> => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(401).json(createErrorResponse(-1, 'Invalid Access'));

  const result = await connection.getQuery(`
    SELECT
      id,
      IF(password = '${password}', TRUE, FALSE) as password
    FROM
      account
    WHERE
      name = '${name}' 
    `);

  if (result.length > 0) {
    if (result[0].password == 1) return res.status(200).json(result);
    else return res.status(401).json(createErrorResponse(-2, 'Invalid Password'));
  }
  return res.status(401).json(createErrorResponse(-3, 'Invalid Name'));
});
