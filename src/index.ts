import * as dotenv from 'dotenv';
import { startApp } from './app';
import userLeaderboardRoutes from './routes/userLeaderboard.routes';
import gameRoutes from './routes/game.routes';

dotenv.config();

startApp();
userLeaderboardRoutes();
gameRoutes();