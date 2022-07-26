import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "progress",
  description: "Create a progress bar for the current song.",
  aliases: ["prog"],
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
      const bar = queue.createProgressBar();
      if (bar) {
        message.channel.send(bar.prettier);
      } else {
        message.channel.send(
          "ERROR: Failed to create progress bar. Try again later."
        );
      }
    } else {
      // the queue doesn't exist
      message.channel.send(
        "WARNING: Queue is empty, can't perform `progress`."
      );
    }
  },
};

export default cmd;
