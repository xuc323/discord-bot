import { Queue } from "discord-music-player";
import { TextBasedChannel } from "discord.js";

export const name = "error";
export function execute(error: Error, queue: Queue): void {
  // retrive the initial message channel from the queue
  const channel: TextBasedChannel = queue.data.msgChannel;
  channel.send(`ERROR: ${error}`);
  console.log(
    `[${queue.guild.name} | ${queue.guild.id}]: MUSIC EVENT ERROR: ${error}`
  );
}
