import { DMPError } from "discord-music-player";
import { Message } from "discord.js";
import { command, MyClient } from "../../type";

const cmd: command = {
  name: "progress",
  description: "Create a progress bar for the current song.",
  aliases: ["prog"],
  args: false,
  execute(message: Message, args: string[], client: MyClient) {
    // check if the queue exists
    const queue = client.player!.getQueue(message.guild!.id);
    if (queue) {
      // the queue exists
      try {
        const bar = queue.createProgressBar();
        if (bar) {
          message.channel.send(`${queue.nowPlaying?.name}\n${bar.prettier}`);
        } else {
          message.channel.send(
            "ERROR: Failed to create progress bar. Try again later."
          );
        }
      } catch (err) {
        const error = err as DMPError;
        message.channel.send(error.message);
      }
    } else {
      // the queue doesn't exist
      message.channel.send(
        `WARNING: Queue is empty, can't perform \`${this.name}\`.`
      );
    }
  },
};

export default cmd;
