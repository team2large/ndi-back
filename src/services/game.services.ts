import client from "../prisma";

export async function getGamesId() {
    return await (await client.game.findMany()).map(x => x.id);
}

export async function getGames() {
    return await client.game.findMany();
}