import { Player, Queue } from "discord-music-player";
import { Client, Message } from "discord.js";
import { readdirSync } from "fs";

export class Music_Player {
  public player: Player;

  constructor(client: Client) {
    // get an instance of music player
    const player = new Player(client);

    // register music events
    const eventFiles = readdirSync("./music_player/events").filter(
      (file: string) => file.endsWith(".js")
    );
    for (const file of eventFiles) {
      const event = require(`./events/${file}`);
      player.on(event.name, (...args) => event.execute(...args));
    }

    this.player = player;
  }

  queueCheck(message: Message): Queue | undefined {
    // check if user is in any voice channel
    const vcChannel = message.member?.voice.channel;
    if (!vcChannel) {
      throw new Error("Please join one of the voice channels to play music.");
    }

    // get queue for the guild id
    const queue = this.player.getQueue(message.guildId ?? "");

    if (queue) {
      // check if the message is from the initial message channel
      if (message.channel != queue.data.msgChannel) {
        throw new Error(
          `The queue was created in another text channel.\nHead to channel ${queue.data.msgChannel} for music commands.`
        );
      }

      // check if the user is in the same voice channel
      if (vcChannel != queue.connection?.channel) {
        throw new Error(
          `Music is playing in other channel.\nJoin ${queue.connection?.channel} or wait for it to finish.`
        );
      }
      return queue;
    } else {
      return void 0;
    }
  }
}
