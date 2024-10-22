import { NextFunction, Request, Response } from 'express';
import { AccountDTO } from '../interface/account.dto';
import accountService from '../service/accountService';
import { createErrorResponse } from '../utils/ErrorResponse';

const accountController = {
  // Signup
  signup: async (req: Request<{}, {}, AccountDTO>, res: Response, next: NextFunction): Promise<any> => {
    const { name, password } = req.body;
    if (!name || !password) return res.status(401).json(createErrorResponse(-1, 'Invalid Access'));

    const result = await accountService.getAccountByAccountName(name);

    if (result) return res.status(401).json(createErrorResponse(-2, 'Name Already exists.'));

    const create = await accountService.createAccount(name, password);
    if (create) return res.status(200).json({ success: true });
    return res.status(401).json(createErrorResponse(-3, 'Internal Server Error'));
  },

  // Signin
  signin: async (req: Request<{}, {}, AccountDTO>, res: Response, next: NextFunction): Promise<any> => {
    const { name, password } = req.body;
    if (!name || !password) return res.status(401).json(createErrorResponse(-1, 'Invalid Access'));

    const accountId = await accountService.getAccountByAccountNameNPassword(name, password);
    if (accountId == -1) return res.status(401).json(createErrorResponse(-3, 'Invalid Name'));
    else if (accountId == -2) return res.status(401).json(createErrorResponse(-2, 'Invalid Password'));

    const accountNPlayer = await accountService.getAccountNPlayerByAccountId(accountId);

    return res.status(200).json(accountNPlayer);
  }
};

export default accountController;
