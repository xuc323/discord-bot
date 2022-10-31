import { DMPError } from "discord-music-player";
import { Message } from "discord.js";
import { command, MyClient } from "../../type";

const cmd: command = {
  name: "seek",
  description: "Fast forward the song.",
  args: true,
  aliases: ["fastforward", "ff"],
  usage: "[time in seconds]",
  async execute(message: Message, args: string[], client: MyClient) {
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
      const time = Number(args[0]);
      if (!time && time != 0) {
        return message.channel.send("Only numbers are allowed..");
      } else if (time < 0) {
        return message.channel.send("Time needs to be greater than 0.");
      }

      try {
        const status = await queue.seek(time * 1000);
        if (status) {
          message.channel.send(`MUSIC STATUS: Fast forwarded ${time} seconds.`);
        } else {
          message.channel.send(
            "ERROR: Failed to fast forward. Try again later."
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