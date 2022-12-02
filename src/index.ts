import * as dotenv from 'dotenv';
import { startApp } from './app';
import userLeaderboardRoutes from './routes/scores.routes';
import gameRoutes from './routes/games.routes';
import toolsRoute from './routes/tools.route';
import adminRoutes from './routes/admin.routes';

dotenv.config();

startApp();
userLeaderboardRoutes();
gameRoutes();
toolsRoute();
adminRoutes()