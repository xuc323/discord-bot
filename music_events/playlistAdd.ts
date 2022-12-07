import { Playlist, Queue } from "discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";

const e: playerEvent = {
  name: "playlistAdd",
  execute(client: MyClient, queue: Queue<queueData>, playlist: Playlist) {
    queue.data?.msgChannel.send(
      `**${playlist.name}** has been added to the queue.\n${playlist.url}`
    );
    console.log(
      `[${queue.guild.name} | ${queue.guild.id} | ${playlist.songs[0].requestedBy?.tag}]: ${playlist} ${playlist.url}`
    );
  },
};

export = e;
