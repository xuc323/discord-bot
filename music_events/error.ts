import { Queue } from "@jadestudios/discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";
import { TextChannel } from "discord.js";

const e: playerEvent = {
  name: "error",
  execute(client: MyClient, error: string, queue: Queue<queueData>) {
    (queue.data?.msgChannel as TextChannel).send(
      `ERROR: an unknown error occured..`
    );
    console.log(
      `[${queue.guild.name} | ${queue.guild.id}]: MUSIC EVENT ERROR: ${error}`
    );
  },
};

export = e;
