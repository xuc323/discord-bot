import { Queue, Song } from "discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";

const e: playerEvent = {
  name: "songChanged",
  execute(
    client: MyClient,
    queue: Queue<queueData>,
    newSong: Song,
    oldSong: Song
  ) {
    queue.data?.msgChannel.send(`**${newSong}** is now playing.`);
  },
};

export default e;
