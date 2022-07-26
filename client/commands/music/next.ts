import { Message } from "discord.js";
import { client, command } from "../../client";

const cmd: command = {
  name: "next",
  description: "Skip to the next song.",
  aliases: ["n", "skip"],
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
      const song = queue.skip();
      if (song) {
        message.channel.send(`MUSIC STATUS: **${song}** is skipped!`);
      } else {
        message.channel.send("ERROR: Failed to skip a song. Try again later.");
      }
    } else {
      // the queue doesn't exist
      message.channel.send(
        "WARNING: Queue is empty, can't perform `skip/next`."
      );
    }
  },
};

export default cmd;
