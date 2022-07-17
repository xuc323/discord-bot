import { Queue, Song } from "discord-music-player";
import { TextBasedChannel } from "discord.js";

export const name = "songFirst";
export function execute(queue: Queue, song: Song): void {
  // retrive the initial message channel from the queue
  const channel: TextBasedChannel = queue.data.msgChannel;
  channel.send(`Started playing **${song}**.`);
}
