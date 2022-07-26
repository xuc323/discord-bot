import { Queue } from "discord-music-player";
import { queueData } from "../player";

export const name = "error";
export function execute(error: Error, queue: Queue<queueData>): void {
  // retrive the initial message channel from the queue
  const channel = queue.data?.msgChannel;
  channel?.send(`ERROR: ${error}`);
  console.log(
    `[${queue.guild.name} | ${queue.guild.id}]: MUSIC EVENT ERROR: ${error}`
  );
}
