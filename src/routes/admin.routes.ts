import { NextFunction, Request, Response } from 'express';
import app from '../app';
import errorMiddleware from '../middlewares/errorMiddleware';
import * as utils from '../utils/controller.utils';

export default function adminRoutes() {

	app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
		try {
            const hashPasswordToCheck = req.body.password;

            utils.throwIfNotString(hashPasswordToCheck, "Password must be a string"); 

            if (process.env.ADMIN_PASSWORD === hashPasswordToCheck) {
                res.status(200).send({message: 'Authorized'});
            } else {
                res.status(401).send({message :'Unauthorized'});
            }
		} catch (error) {
			next(error);
		}
	}, errorMiddleware);

}