import { Queue } from "discord-music-player";
import { TextBasedChannel } from "discord.js";

export const name = "channelEmpty";
export function execute(queue: Queue): void {
  // retrive the initial message channel from the queue
  const channel: TextBasedChannel = queue.data.msgChannel;
  channel.send("Everyone left the Voice Channel, queue ended.");
}
