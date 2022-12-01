import { NextFunction, Request, Response } from 'express';
import app from '../app';
import errorMiddleware from '../middlewares/errorMiddleware';
import * as scoresService from '../services/scores.services';
import * as utils from '../utils/controller.utils';


export default function scoresRoutes() {

	app.post('/games/:slug/scores', async (req: Request, res: Response, next: NextFunction) => {
		try {
			
			// get data
            const { username, score } = req.body;
			
            // check data consistency
			utils.throwIfNotString(username, "Username must be a string");
			utils.throwIfNotNumber(score, "Score must be an number");
			
			const result = await scoresService.add(username, req.params.slug, score);
			
			res.status(200).send(result);
		} catch (error) {
			next(error); // error is handled by the error middleware
		}
	}, errorMiddleware);

	app.delete('/admin/scores/:id', async (req: Request, res: Response, next: NextFunction) => {
		try {
			await scoresService.deleteScore(Number(req.params.id));
			res.status(200).send({
				message: "UserLeaderboard entry was successfully deleted."
			});
		} catch (error) {
			next(error); // error is handled by the error middleware
		}
	}, errorMiddleware);
	
	app.get('/admin/scores', async (req: Request, res: Response, next: NextFunction) => {
		try {
	
			const result = await scoresService.getAll();
			res.status(200).send(result);
		
		} catch (error) {
			next(error); // error is handled by the error middleware
		}
	}, errorMiddleware);

	app.get('/games/:slug/scores', async (req: Request, res: Response, next: NextFunction) => {
		try {
	
			const result = await scoresService.get(req.params.slug);
			res.status(200).send(result);
		
		} catch (error) {
			next(error); // error is handled by the error middleware
		}
	
	}, errorMiddleware);
}