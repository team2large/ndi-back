import express, { NextFunction, Response, Request } from 'express';

import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';

const app = express();

export function startApp() {
  app.use(express.json());
  app.use(hpp());
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan(':date[web] - :method :url :status :res[content-length] - :response-time ms'));
  app.use(handleTopLevelErrors);

  app.listen(process.env.API_PORT, () => {
    console.log(`==== Server running on port ${process.env.API_PORT} ====`);
  });
}

function handleTopLevelErrors(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(500).json(err?.message ?? 'Bad request - Top level error handler');
  next();
}

export default app;