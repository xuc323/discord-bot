import { Queue, Song } from "@jadestudios/discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";
import { TextChannel } from "discord.js";

const e: playerEvent = {
  name: "songFirst",
  execute(client: MyClient, queue: Queue<queueData>, song: Song) {
    (queue.data?.msgChannel as TextChannel).send(
      `Started playing **${song}**.`
    );
  },
};

export = e;
