import { DMPError } from "discord-music-player";
import { Message } from "discord.js";
import { command, MyClient } from "../../type";

const cmd: command = {
  name: "shuffle",
  description: "Shuffle the queue.",
  aliases: ["shuf"],
  args: false,
  execute(message: Message, args: string[], client: MyClient) {
    // check if the queue exists
    const queue = client.player!.getQueue(message.guild!.id);
    if (queue) {
      // the queue exists
      if (queue.connection?.channel != message.member?.voice.channel) {
        // the user is not in the same voice channel as the bot
        return message.channel.send(
          `Music is playing in ${queue.connection?.channel}. Join or wait for it to finish.`
        );
      }

      // the user is in the same voice channel as the bot
      try {
        const songs = queue.shuffle();
        if (songs) {
          message.channel.send("MUSIC STATUS: Queue is now shuffled!");
        } else {
          message.channel.send(
            "ERROR: Failed to shuffle the queue. Try again later."
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
