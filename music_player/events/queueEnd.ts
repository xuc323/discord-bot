import { Queue } from "discord-music-player";
import { queueData } from "../player";

export const name = "queueEnd";
export function execute(queue: Queue<queueData>): void {
  // retrive the initial message channel from the queue
  const channel = queue.data?.msgChannel;
  channel?.send("The queue has ended.");
}
