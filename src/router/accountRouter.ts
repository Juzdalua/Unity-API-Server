import express from 'express';
import accountController from '../controller/accountController';

export const accountRouter = express.Router();

accountRouter.route('/signup').post(accountController.signup);
accountRouter.route('/signin').post(accountController.signin);
