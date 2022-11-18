import { Queue } from "discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";

const e: playerEvent = {
  name: "error",
  execute(client: MyClient, error: string, queue: Queue<queueData>) {
    queue.data?.msgChannel.send(`ERROR: an unknown error occured..`);
    console.log(
      `[${queue.guild.name} | ${queue.guild.id}]: MUSIC EVENT ERROR: ${error}`
    );
  },
};

export default e;
