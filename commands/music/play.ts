import { GuildChannelResolvable, Message } from "discord.js";
import { command, MyClient } from "../../type";

const cmd: command = {
  name: "play",
  description: "Play the music by name or url.",
  aliases: ["p"],
  args: true,
  usage: "[song name or url]",
  async execute(message: Message, args: string[], client: MyClient) {
    // create queue if not exists, otherwise get the queue
    const queue = client.player!.createQueue(message.guild!.id, {
      data: {
        msgChannel: message.channel,
      },
    });

    await queue.join(message.member?.voice.channel as GuildChannelResolvable);
    if (queue.connection?.channel != message.member?.voice.channel) {
      // the user is not in the same voice channel as the bot
      return message.channel.send(
        `Music is playing in ${queue.connection?.channel}. Join or wait for it to finish.`
      );
    }
    // the user is in the same voice channel as the bot
    // add music to the queue
    await queue
      .play(args.join(" "), { requestedBy: message.author })
      .catch((err) => {
        console.log(`MUSIC PLAY ERROR: ${err}`);
        message.channel.send(err);
      });
  },
};

export = cmd;
