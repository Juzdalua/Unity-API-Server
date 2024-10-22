import { NextFunction, Request, Response } from 'express';
import { AccountDTO } from '../interface/account.dto';
import accountService from '../service/accountService';
import { createErrorResponse } from '../utils/ErrorResponse';

const accountController = {
  signup: async (req: Request<{}, {}, AccountDTO>, res: Response, next: NextFunction): Promise<any> => {
    const { name, password } = req.body;
    if (!name || !password) return res.status(401).json(createErrorResponse(-1, 'Invalid Access'));

    const result = await accountService.getAccountByAccountName(name);

    if (result.length > 0) return res.status(401).json(createErrorResponse(-2, 'Name Already exists.'));

    return res.status(401).json(createErrorResponse(-3, 'Invalid Name'));
  },

  signin: async (req: Request<{}, {}, AccountDTO>, res: Response, next: NextFunction): Promise<any> => {
    const { name, password } = req.body;
    if (!name || !password) return res.status(401).json(createErrorResponse(-1, 'Invalid Access'));

    const result = await accountService.getAccountByAccountNameNPassword(name, password);

    if (result.length > 0) {
      if (result[0].password == 1) return res.status(200).json(result);
      else return res.status(401).json(createErrorResponse(-2, 'Invalid Password'));
    }
    return res.status(401).json(createErrorResponse(-3, 'Invalid Name'));
  }
};

export default accountController;