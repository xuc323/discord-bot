import { Queue } from "@jadestudios/discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";
import { TextChannel } from "discord.js";

const e: playerEvent = {
  name: "queueEnd",
  execute(client: MyClient, queue: Queue<queueData>) {
    (queue.data?.msgChannel as TextChannel).send("The queue has ended.");
  },
};

export = e;
