import { Queue } from "discord-music-player";
import { Message } from "discord.js";
import { queueData } from "../../../music_player/player";
import { client, command } from "../../client";

const cmd: command = {
  name: "playlist",
  description: "Play the music in the playlist by url.",
  aliases: ["pl"],
  args: true,
  usage: "[playlist url]",
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
        // add playlist to the queue
        queue
          .playlist(args.join(" "), {
            requestedBy: message.author,
            shuffle: true,
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
