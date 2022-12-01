import { NextFunction, Request, Response } from 'express';
import app from '../app';
import errorMiddleware from '../middlewares/errorMiddleware';
import * as userLeaderboardService from '../services/userLeaderboard.services';
import * as utils from '../utils/controller.utils';


export default function userLeaderboard() {

	app.post('/userLeaderboard/add', async (req: Request, res: Response, next: NextFunction) => {
		try {
			
			// get data
            const { username, gameId, score } = req.body;
			
            // check data consistency
			utils.throwIfNotString(username, "Username must be a string");
			utils.throwIfNotNumber(gameId, "Game id must be an number");
			utils.throwIfNotNumber(score, "Score must be an number");
			
			const result = await userLeaderboardService.addleaderboardEntry(username, gameId, score);
			
			res.status(200).send(result);
		} catch (error) {
			next(error); // error is handled by the error middleware
		}
	}, errorMiddleware);
	
	app.get('/userLeaderboard/getAll', async (req: Request, res: Response, next: NextFunction) => {
		try {
	
			const result = await userLeaderboardService.allLeaderboardEntries();
			res.status(200).send(result);
		
		} catch (error) {
			next(error); // error is handled by the error middleware
		}
	
	}, errorMiddleware);

	app.get('/userLeaderboard/:gameId', async (req: Request, res: Response, next: NextFunction) => {
		try {
	
			const result = await userLeaderboardService.getGameLeaderboard(Number(req.params.gameId));
			res.status(200).send(result);
		
		} catch (error) {
			next(error); // error is handled by the error middleware
		}
	
	}, errorMiddleware);
}