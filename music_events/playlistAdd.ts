import { Playlist, Queue } from "@jadestudios/discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";
import { TextChannel } from "discord.js";

const e: playerEvent = {
  name: "playlistAdd",
  execute(client: MyClient, queue: Queue<queueData>, playlist: Playlist) {
    (queue.data?.msgChannel as TextChannel).send(
      `**${playlist.name}** has been added to the queue.\n${playlist.url}`
    );
    console.log(
      `[${queue.guild.name} | ${queue.guild.id} | ${playlist.songs[0].requestedBy?.tag}]: ${playlist} ${playlist.url}`
    );
  },
};

export = e;
