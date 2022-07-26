import { Playlist, Queue } from "discord-music-player";
import { queueData } from "../player";

export const name = "playlistAdd";
export function execute(queue: Queue<queueData>, playlist: Playlist): void {
  // retrive the initial message channel from the queue
  const channel = queue.data?.msgChannel;
  channel?.send(
    `**${playlist.name}** has been added to the queue.\n${playlist.url}`
  );
  console.log(
    `[${queue.guild.name} | ${queue.guild.id} | ${playlist.songs[0].requestedBy?.tag}]: ${playlist} ${playlist.url}`
  );
}
