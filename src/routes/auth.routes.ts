import { NextFunction, Request, Response } from 'express';
import app from '../app';
import * as utils from '../utils/controller.utils';

import * as authService from '../services/auth.services';
import errorMiddleware from '../middlewares/errorMiddleware';

export default function authRoutes() {

    app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, firstName, lastName } = req.body;

            // Check if all parameters are correct
            utils.throwIfNotEmail(email);
            utils.throwIfNotString(password, 'Password must be a string');
            utils.throwIfNotString(firstName, 'First name must be a string');
            utils.throwIfNotString(lastName, 'Last name must be a string');

            // Send data to service
            const registerResult = await authService.register(email, password, firstName, lastName);
            
            // Send response
            res.status(200).send(registerResult);
        } catch (error) {
            next(error); // error is handled by the error middleware
        }
    }, errorMiddleware);

    app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            // Check if all parameters are correct
            utils.throwIfNotEmail(email);
            utils.throwIfNotString(password, 'Password must be a string');

            // Send data to service
            const loginResult = await authService.login(email, password);
            
            // Send response
            res.status(200).send(loginResult);
        } catch (error) {
            next(error); // error is handled by the error middleware
        }
    }, errorMiddleware);

}