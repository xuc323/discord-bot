import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "stop",
  description: "Stop the music and leave the voice channel.",
  aliases: ["s"],
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
      queue.stop();
      message.channel.send("MUSIC STATUS: Music stopped, queue is cleared!");
    } else {
      // the queue doesn't exist
      message.channel.send("WARNING: Queue is empty, can't perform `stop`.");
    }
  },
};

export default cmd;
