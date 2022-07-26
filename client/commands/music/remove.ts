import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "remove",
  description: "Remove the music from the queue.",
  aliases: ["delete", "d"],
  args: true,
  usage: "[music number]",
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
      if (!Number(args[0])) {
        return message.channel.send(
          "ERROR: The argument can only be a number."
        );
      }

      const num = Number(args[0]);
      if (num < 1) {
        return message.channel.send(
          "ERROR: Song number can only be greater than 1."
        );
      } else if (num === 1) {
        return message.channel.send(
          "WARNING: Can't remove the song that is currently playing. Use `skip` instead."
        );
      }

      const song = queue.remove(num - 1);
      if (song) {
        message.channel.send(`Song ${song.name} is removed from the queue.`);
      } else {
        message.channel.send(
          `ERROR: Can't remove the song at index \`${num}\`. Try again later.`
        );
      }
    } else {
      // the queue doesn't exist
      message.channel.send(
        "WARNING: Queue is empty, can't perform `delete/remove`."
      );
    }
  },
};

export default cmd;
