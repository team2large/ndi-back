import { NextFunction, Request, Response } from 'express';
import client from '../prisma';
import * as toolsServices from '../services/tools.services';
import app from '../app';
import errorMiddleware from '../middlewares/errorMiddleware';

export default function toolsRoute() {

	app.get('/tools/refreshGames', async (req: Request, res: Response, next: NextFunction) => {
		try {
            await toolsServices.refreshGames();
			res.status(200).send('Games refreshed');
		} catch (error) {
			next(error); // error is handled by the error middleware
		}
	}, errorMiddleware);

}