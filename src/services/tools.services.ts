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

export async function refreshGames() {
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
}


const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export async function refreshScores() {
    await client.scores.deleteMany();
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

