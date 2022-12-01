import * as dotenv from 'dotenv';
import { startApp } from './app';
import userLeaderboardRoutes from './routes/userLeaderboard.routes';
import gameRoutes from './routes/game.routes';
import toolsRoute from './routes/tools.route';
import adminRoutes from './routes/admin.routes';

dotenv.config();

startApp();
userLeaderboardRoutes();
gameRoutes();
toolsRoute();
adminRoutes()