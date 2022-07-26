import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "shuffle",
  description: "Shuffle the queue.",
  aliases: ["shuf"],
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
      queue.shuffle();
      message.channel.send("MUSIC STATUS: Queue is now shuffled!");
    } else {
      // the queue doesn't exist
      message.channel.send("WARNING: Queue is empty, can't perform `shuffle`.");
    }
  },
};

export default cmd;
