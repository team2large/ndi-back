import client from "../prisma";

export async function getGame(gameSlug: string) {
    return await client.games.findFirst({
        where: { slug: gameSlug },
        include: { leaderboard: true }
    });
}

export async function getGames() {
    return await client.games.findMany();
}