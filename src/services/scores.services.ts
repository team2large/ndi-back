import { HttpException } from "../utils/HttpException";
import client from "../prisma";
import * as gameService from "./games.services";
import { Games } from "@prisma/client";


export async function getAll(){
    return await client.scores.findMany({
        orderBy: {
            date: 'desc',
          },
    });
}

export async function get(gameSlug: string){
    return (await gameService.getGame(gameSlug))?.leaderboard.sort((a, b) => b.score - a.score);
}

export async function add(username: string, gameSlug: string, score: number) {

    // Do game exist ?
    const game : Games | null = await gameService.getGame(gameSlug);
    if (game == null) {
        throw new HttpException(400, "gameId doesn't exist.");
    }

    // Make user name unique

    let existingUser = await client.scores.findUnique({
        where: { username: username },
    });

    let counter : number = 0;
    let newUsername : string = username;
    while (existingUser != null) {

        newUsername = username + counter;

        existingUser = await client.scores.findUnique({
            where: { username: newUsername },
        });
        counter += 1;
    }


    const user = await client.scores.create({
        data: { username: newUsername,  gameId : game.id, score: score},
    });

    return user;
}

export async function deleteScore(scoreId: number) {

    let deleteResp = await client.scores.deleteMany({
        where: {
            id: scoreId
        },
    });

    if (deleteResp.count == 0) {
        throw new HttpException(400, "Leaderboard entry doesn't exist.");
    }
}