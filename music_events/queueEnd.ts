import { Queue } from "@jadestudios/discord-music-player";
import { MyClient, PlayerEvent, QueueData } from "../type";
import { TextChannel } from "discord.js";

export const event: PlayerEvent = {
  name: "queueEnd",
  execute(client: MyClient, queue: Queue<QueueData>) {
    (queue.data?.msgChannel as TextChannel).send("The queue has ended.");
  },
};
