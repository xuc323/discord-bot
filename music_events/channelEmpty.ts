import { Queue } from "@jadestudios/discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";
import { TextChannel } from "discord.js";

const e: playerEvent = {
  name: "channelEmpty",
  execute(client: MyClient, queue: Queue<queueData>) {
    (queue.data?.msgChannel as TextChannel).send(
      "Everyone left the Voice Channel, queue ended."
    );
  },
};

export = e;
