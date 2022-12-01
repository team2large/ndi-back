import { HttpException } from "../utils/HttpException";
import client from "../prisma";
import * as gameService from "./game.services";


export async function allLeaderboardEntries(){
    return await client.userLeaderboard.findMany({
        orderBy: {
            date: 'desc',
          },
    });
}

export async function getGameLeaderboard(gameId: number){
    return await client.userLeaderboard.findMany({
        where: { gameId: gameId },
        orderBy: {
            score: 'desc',
          },
    });
}

export async function addleaderboardEntry(username: string, gameId: number, score: number) {

    // Do game exist ?
    const gameExists : boolean = (await gameService.getGamesId()).includes(gameId);
    if (!gameExists) {
        throw HttpException.INVALID_PARAMETER;
    }

    // Make user name unique

    let existingUser = await client.userLeaderboard.findUnique({
        where: { username: username },
    });

    let counter : number = 0;
    let newUsername : string = username;
    while (existingUser != null) {

        newUsername = username + counter;

        existingUser = await client.userLeaderboard.findUnique({
            where: { username: newUsername },
        });
        counter += 1;
    }


    const user = await client.userLeaderboard.create({
        data: { username: newUsername,  gameId : gameId, score: score},
    });

    return user;
}