import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "play",
  description: "Play the music by name or url.",
  aliases: ["p"],
  args: true,
  usage: "[song name or url]",
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

    if (!queue) {
      // if queue doesn't exist, create one
      queue = client.player.createQueue(message.guild?.id, {
        data: {
          msgChannel: message.channel,
        },
      });
    }

    queue
      .join(message.member?.voice.channel!)
      .then(() => {
        // add music to the queue
        queue
          .play(args.join(" "), {
            requestedBy: message.author,
          })
          .catch((err) => {
            console.log(`MUSIC PLAY ERROR: ${err.stack}`);
            message.channel.send(err.message);
          });
      })
      .catch((err) => {
        console.log(`MUSIC JOIN ERROR: ${err.stack}`);
        message.channel.send(err.message);
      });
  },
};

export default cmd;
