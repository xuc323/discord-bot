import { Queue, RepeatMode } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "repeat",
  description: "Repeat the current song.",
  aliases: ["r"],
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
      const status = queue.setRepeatMode(RepeatMode.SONG); // set repeat mode to SONG
      if (status) {
        message.channel.send("MUSIC STATUS: Now repeating the current song!");
      } else {
        message.channel.send(
          "ERROR: Failed to repeat the current song. Try again later."
        );
      }
    } else {
      // the queue doesn't exist
      message.channel.send("WARNING: Queue is empty, can't perform `repeat`.");
    }
  },
};

export default cmd;
