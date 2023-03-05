import { Queue } from "@jadestudios/discord-music-player";
import { playerEvent, MyClient, queueData } from "../type";
import { TextChannel } from "discord.js";

const e: playerEvent = {
  name: "clientDisconnect",
  execute(client: MyClient, queue: Queue<queueData>) {
    (queue.data?.msgChannel as TextChannel).send(
      "I was kicked from the Voice Channel, queue ended."
    );
  },
};

export = e;
