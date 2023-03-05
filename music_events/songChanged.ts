import { Queue, Song } from "@jadestudios/discord-music-player";
import { MyClient, playerEvent, queueData } from "../type";
import { TextChannel } from "discord.js";

const e: playerEvent = {
  name: "songChanged",
  execute(
    client: MyClient,
    queue: Queue<queueData>,
    newSong: Song,
    oldSong: Song
  ) {
    (queue.data?.msgChannel as TextChannel).send(
      `**${newSong}** is now playing.`
    );
  },
};

export = e;
