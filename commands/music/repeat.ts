import { Message } from "discord.js";
import { DMPError, RepeatMode } from "discord-music-player";
import { command, MyClient } from "../../type";

const cmd: command = {
  name: "repeat",
  description: "Repeat the current song.",
  aliases: ["r"],
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
        const status = queue.setRepeatMode(RepeatMode.SONG); // set repeat mode to SONG
        if (status) {
          message.channel.send("MUSIC STATUS: Now repeating the current song!");
        } else {
          message.channel.send(
            "ERROR: Failed to repeat the current song. Try again later."
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
