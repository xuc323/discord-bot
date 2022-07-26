import { Message } from "discord.js";
import { client, command } from "../../client";

const cmd: command = {
  name: "pause",
  description: "Pause the queue.",
  args: false,
  category: "music",
  execute(message: Message, args: string[], client: client) {
    let queue; // the queue instance might be undefined
    try {
      queue = client.player.queueCheck(message, client);
    } catch (err) {
      if (err instanceof Error) {
        return message.channel.send(err.message);
      } else {
        return;
      }
    }

    if (queue) {
      // the queue exists
      const status = queue.setPaused(true);
      if (status) {
        message.channel.send("MUSIC STATUS: The queue is now paused!");
      } else {
        message.channel.send(
          "ERROR: Failed to pause the queue. Try again later."
        );
      }
    } else {
      // the queue doesn't exist
      message.channel.send("WARNING: Queue is empty, can't perform `pause`.");
    }
  },
};

export default cmd;
