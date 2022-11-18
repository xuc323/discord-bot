import { Queue } from "discord-music-player";
import { playerEvent, MyClient, queueData } from "../type";

const e: playerEvent = {
  name: "clientDisconnect",
  execute(client: MyClient, queue: Queue<queueData>) {
    queue.data?.msgChannel.send(
      "I was kicked from the Voice Channel, queue ended."
    );
  },
};

export default e;
