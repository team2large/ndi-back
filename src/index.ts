import * as dotenv from 'dotenv';
import { startApp } from './app';
import templateRoutes from './routes/template.route';
import userLeaderboardRoutes from './routes/userLeaderboard.routes';
import gameRoutes from './routes/game.routes';

dotenv.config();

startApp();
templateRoutes();
userLeaderboardRoutes();
gameRoutes();