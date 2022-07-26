import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "seek",
  description: "Fast forward the song.",
  args: true,
  aliases: ["fastforward", "ff"],
  usage: "[time in seconds]",
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
      const time = Number(args[0]);
      queue.seek(time * 1000).then((status) => {
        if (status) {
          message.channel.send(`MUSIC STATUS: Fast forwarded ${time} seconds.`);
        } else {
          message.channel.send(
            "ERROR: Failed to fast forward. Try again later."
          );
        }
      });
    } else {
      // the queue doesn't exist
      message.channel.send(
        "WARNING: Queue is empty, can't perform `seek/fastforward`."
      );
    }
  },
};

export default cmd;
