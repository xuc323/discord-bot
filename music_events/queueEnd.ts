import { Queue } from "discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";

const e: playerEvent = {
  name: "queueEnd",
  execute(client: MyClient, queue: Queue<queueData>) {
    queue.data?.msgChannel.send("The queue has ended.");
  },
};

export default e;
