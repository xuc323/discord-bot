import { Queue, Song } from "discord-music-player";
import { TextBasedChannel } from "discord.js";

export const name = "songChanged";
export function execute(queue: Queue, newSong: Song, oldSong: Song): void {
  // retrive the initial message channel from the queue
  const channel: TextBasedChannel = queue.data.msgChannel;
  channel.send(`**${newSong}** is now playing.`);
}
