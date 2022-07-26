import { EmbedBuilder, Message } from "discord.js";
import { client, command } from "../../client";

const cmd: command = {
  name: "recent",
  description: "Print the songs played previously. (Up to 25, default is 5)",
  args: false,
  usage: "[number of songs]",
  category: "music",
  execute(message: Message, args: string[], client: client) {
    // create an embed message
    const emb = new EmbedBuilder()
      .setTitle(`Recently played songs for ${message.guild!.name}`)
      .setThumbnail(message.guild!.iconURL());

    // if no args or args is not a number, default to 5, otherwise use args[0]
    const limit = (args[0] && Number(args[0])) || 5;
    if (limit > 25) {
      // set limit to 25 because that's what discord allows
      return message.channel.send("The limit is 25.");
    }

    client.postgres
      .getRecentSongs(message.guild!.id, limit)
      .then((songs: any) => {
        // get whichever is smaller
        const len = songs.rows.length > limit ? limit : songs.rows.length;
        for (let i = 0; i < len; i++) {
          const song = songs.rows[i];
          emb.addFields([
            {
              name: `#${i + 1}`,
              value: `**Name: **${song.name}\n**Author: **${song.author}\n**Url: **${song.url}\n**Requested By: **<@${song.id}>\n**Requested At: **${song.date}\n`,
            },
          ]);
        }
        emb.setFooter({ text: `Count: ${len}` });
        message.channel.send({ embeds: [emb] });
      })
      .catch((err: Error) => {
        message.channel.send(err.message);
        console.log(err);
      });
  },
};

export default cmd;
