import { Queue } from "@jadestudios/discord-music-player";
import { PlayerEvent, MyClient, QueueData } from "../type";
import { TextChannel } from "discord.js";

export const event: PlayerEvent = {
  name: "clientDisconnect",
  execute(client: MyClient, queue: Queue<QueueData>) {
    (queue.data?.msgChannel as TextChannel).send(
      "I was kicked from the Voice Channel, queue ended."
    );
  },
};
