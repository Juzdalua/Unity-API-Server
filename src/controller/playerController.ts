import { NextFunction, Request, Response } from 'express';
import { PlayerDto } from '../interface/player.dto';
import playerService from '../service/playerService';
import { createErrorResponse } from '../utils/ErrorResponse';

const playerController = {
  move: async (req: Request<{}, {}, PlayerDto>, res: Response, next: NextFunction): Promise<any> => {
    const { playerId, posX, posY } = req.body;
    const result = await playerService.UpdateMove(playerId, posX, posY);
    if (result) return res.status(200).json({ success: true });
    return res.status(500).json(createErrorResponse(-7, 'Internal Server Error'));
  },

  createParty: async (req: Request<{}, {}, PlayerDto>, res: Response, next: NextFunction): Promise<any> => {
    const { playerId } = req.body;
    const isJoinParty = await playerService.IsJoinparty(playerId);
    if (isJoinParty) return res.status(500).json(createErrorResponse(-8, 'Already Join Party'));

    const partyId = await playerService.CreateParty(playerId);
    if(partyId == -1)return res.status(500).json(createErrorResponse(-9, 'Internal Server Error'));
    return res.status(200).json({ success: true });
  }
};

export default playerController;
