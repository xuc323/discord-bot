import { Queue, RepeatMode } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "loop",
  description: "Loop the queue.",
  aliases: ["l"],
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
      const status = queue.setRepeatMode(RepeatMode.QUEUE); // set repeat mode to QUEUE
      if (status) {
        message.channel.send("MUSIC STATUS: Now looping the queue!");
      } else {
        message.channel.send("ERROR: Failed to set loop. Try again later.");
      }
    } else {
      // the queue doesn't exist
      message.channel.send("WARNING: Queue is empty, can't perform `loop`.");
    }
  },
};

export default cmd;
