import { Queue } from "discord-music-player";
import { queueData } from "../player";

export const name = "channelEmpty";
export function execute(queue: Queue<queueData>): void {
  // retrive the initial message channel from the queue
  const channel = queue.data?.msgChannel;
  channel?.send("Everyone left the Voice Channel, queue ended.");
}
