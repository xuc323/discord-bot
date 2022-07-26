import { Queue, Song } from "discord-music-player";
import { queueData } from "../player";

export const name = "songFirst";
export function execute(queue: Queue<queueData>, song: Song): void {
  // retrive the initial message channel from the queue
  const channel = queue.data?.msgChannel;
  channel?.send(`Started playing **${song}**.`);
}
