import { NextFunction, Request, Response } from 'express';
import client from '../prisma';
import app from '../app';
import errorMiddleware from '../middlewares/errorMiddleware';
import * as gameService from '../services/game.services';

export default function gameRoutes() {

	app.get('/games', async (req: Request, res: Response, next: NextFunction) => {
		try {
        
            const games = await gameService.getGames();

			res.status(200).json(games);
		} catch (error) {
			next(error);
		}
	}, errorMiddleware);

}