import * as dotenv from 'dotenv';
import { startApp } from './app';
import authRoutes from './routes/auth.routes';
import templateRoutes from './routes/template.route';

dotenv.config();

startApp();
templateRoutes();
authRoutes();