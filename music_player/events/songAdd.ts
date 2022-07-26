import { Queue, Song } from "discord-music-player";
import { queueData } from "../player";

export const name = "songAdd";
export function execute(queue: Queue<queueData>, song: Song): void {
  // retrive the initial message channel from the queue
  const channel = queue.data?.msgChannel;
  channel?.send(`**${song.name}** has been added to the queue.\n${song.url}`);
  console.log(
    `[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy?.tag}]: ${song} ${song.url}`
  );
}
