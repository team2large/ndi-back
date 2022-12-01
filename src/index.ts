import * as dotenv from 'dotenv';
import { startApp } from './app';
import userLeaderboardRoutes from './routes/scores.routes';
import gameRoutes from './routes/games.routes';
import toolsRoute from './routes/tools.route';

dotenv.config();

startApp();
userLeaderboardRoutes();
gameRoutes();
toolsRoute();