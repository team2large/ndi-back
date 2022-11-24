import { Request, Response } from 'express';
import app from '../app';

export default function templateRoutes() {

  app.get('/', async (req: Request, res: Response) => {
    res.json('Ndi backend');
  });

  app.get('/helloJson', async (req: Request, res: Response) => {
    res.json({
        message: 'Hello world',
    });
  });
}
