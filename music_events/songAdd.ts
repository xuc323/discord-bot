import { Queue, Song } from "discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";

const e: playerEvent = {
  name: "songAdd",
  execute(client: MyClient, queue: Queue<queueData>, song: Song) {
    queue.data?.msgChannel.send(
      `**${song.name}** has been added to the queue.\n${song.url}`
    );
    console.log(
      `[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy?.tag}]: ${song} ${song.url}`
    );
  },
};

export default e;
