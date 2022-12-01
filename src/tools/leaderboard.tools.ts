import client from "../prisma";

const userLeaderboard = async () => {
    //get the ids of all games
    const games = await client.game.findMany({
        select: {
            id: true,
        }
    });

    for(let game of games){
        const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const leaderboard = await client.userLeaderboard.create({
            data: {
                game: {
                    connect: {
                        id: game.id,
                    },
                },
                username : randomName,
                score : Math.floor(Math.random() * 1000),
            },
        });
    }
}

userLeaderboard();
