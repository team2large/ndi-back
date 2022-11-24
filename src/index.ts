import * as dotenv from 'dotenv';
import { startApp } from './app';
import templateRoutes from './routes/template.route';

dotenv.config();

startApp();
templateRoutes();