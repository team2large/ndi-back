
import client from "../prisma";
import { Game } from "@prisma/client";
import { create } from "domain";

const createGame = async (name : string) => {
    const game = await client.game.create({
        data: {
            name,
            isStory: false,
            
            
        },
    });
}




createGame("MemoryCapote");
createGame("ISTClicker");
createGame("Dépisteur");

