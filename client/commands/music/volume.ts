import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "volume",
  description: "Display or adjust the volume of the music.",
  aliases: ["v"],
  args: false,
  usage: "[volume number]",
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
      if (args[0] && Number(args[0])) {
        const vol = Number(args[0]);
        const status = queue.setVolume(vol);
        if (status) {
          message.channel.send(`MUSIC STATUS: Volume set to ${vol}%.`);
        } else {
          message.channel.send("ERROR: Failed to set volume. Try again later.");
        }
      } else {
        message.channel.send(`MUSIC STATUS: Volume at ${queue.volume}%.`);
      }
    } else {
      // the queue doesn't exist
      message.channel.send("WARNING: Queue is empty, can't perform `volume`.");
    }
  },
};
