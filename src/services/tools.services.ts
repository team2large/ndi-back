import client from "../prisma";
let gamesJson = require("../json/games.json");
export async function refreshGames() {
    await client.game.deleteMany();
    for (const game of gamesJson) {
        await client.game.create({
            data: {
                name: game.name,
                isStory: false,
                slug: game.slug,
                description: game.description
            },
        });
    }
}

