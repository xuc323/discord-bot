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
    client.postgres?.playSongInsert(
      {
        id: queue.guild.id,
        name: queue.guild.name,
      },
      { name: song.name, url: song.url, author: song.author },
      {
        username: song.requestedBy?.username!,
        discriminator: song.requestedBy?.discriminator!,
        id: song.requestedBy?.id!,
      }
    );
  },
};

export = e;
