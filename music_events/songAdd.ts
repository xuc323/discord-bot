import { Queue, Song } from "@jadestudios/discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";
import { TextChannel } from "discord.js";

const e: playerEvent = {
  name: "songAdd",
  execute(client: MyClient, queue: Queue<queueData>, song: Song) {
    (queue.data?.msgChannel as TextChannel).send(
      `**${song.name}** has been added to the queue.\n${song.url}`
    );
    console.log(
      `[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy?.tag}]: ${song} ${song.url}`
    );
  },
};

export = e;
