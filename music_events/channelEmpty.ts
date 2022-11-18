import { Queue } from "discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";

const e: playerEvent = {
  name: "channelEmpty",
  execute(client: MyClient, queue: Queue<queueData>) {
    queue.data?.msgChannel.send(
      "Everyone left the Voice Channel, queue ended."
    );
  },
};

export default e;
