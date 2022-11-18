import { Queue, Song } from "discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";

const e: playerEvent = {
  name: "songFirst",
  execute(client: MyClient, queue: Queue<queueData>, song: Song) {
    queue.data?.msgChannel.send(`Started playing **${song}**.`);
  },
};

export default e;
