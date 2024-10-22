import express from 'express';
import playerController from '../controller/playerController';

export const playerRouter = express.Router();

playerRouter.route('/move').post(playerController.move);
playerRouter.route('/party').post(playerController.createParty);
