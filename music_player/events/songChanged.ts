import { Queue, Song } from "discord-music-player";
import { queueData } from "../player";

export const name = "songChanged";
export function execute(
  queue: Queue<queueData>,
  newSong: Song,
  oldSong: Song
): void {
  // retrive the initial message channel from the queue
  const channel = queue.data?.msgChannel;
  channel?.send(`**${newSong}** is now playing.`);
}
