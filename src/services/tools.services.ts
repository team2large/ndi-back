import client from "../prisma";
const gamesJson = [
    {
        "slug": "depisteur",
        "name": "Dépisteur",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros. Pellentesque."
    },
    {
        "slug": "ist_clicker",
        "name": "IST Clicker",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros."
    },
    {
        "slug": "memory_capote",
        "name": "Memory Capote",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros. Pellentesque mollis consequat imperdiet"
    },
    {
        "slug": "storytelling",
        "name": "Story Telling",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat"
    }
]


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

