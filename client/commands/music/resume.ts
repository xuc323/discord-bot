import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "resume",
  description: "Resume the current song.",
  aliases: ["c", "continue"],
  args: false,
  category: "music",
  execute(message: Message, args: string[], client: client) {
    let queue: Queue<queueData>; // the queue instance might be undefined
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
      const status = queue.setPaused(false);
      if (!status) {
        message.channel.send("MUSIC STATUS: The queue is now resumed!");
      } else {
        message.channel.send(
          "ERROR: Failed to resume the queue. Try again later."
        );
      }
    } else {
      // the queue doesn't exist
      message.channel.send(
        "WARNING: Queue is empty, can't perform `resume/continue`."
      );
    }
  },
};

export default cmd;
