import client from "../prisma";
const gamesJson = [
    {
        "slug": "depisteur",
        "name": "Dépisteur",
        "description": "Démine les IST"
    },
    {
        "slug": "ist_clicker",
        "name": "IST Clicker",
        "description": "Détruit les toutes"
    },
    {
        "slug": "memory_capote",
        "name": "MemoCapote",
        "description": "Ne capote pas"
    },
    {
        "slug": "morpion",
        "name": "Morpion",
        "description": "Affronte les morpions"
    }
]

const usernames = ["leo", "yuri", "lucas", "clian :)", "guillaume", "ruben", "alexandre"]
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export async function refresh() {
    await client.scores.deleteMany();
    await client.games.deleteMany();
    for (const game of gamesJson) {
        await client.games.create({
            data: {
                name: game.name,
                isStory: false,
                slug: game.slug,
                description: game.description
            },
        });
    }

    let games = await client.games.findMany();
    games.forEach(g => {
        usernames.forEach(async username => {
            await client.scores.create({
                data: {
                    gameId: g.id,
                    username,
                    score: getRandomInt(999)
                }
            });
        });
    })
}
