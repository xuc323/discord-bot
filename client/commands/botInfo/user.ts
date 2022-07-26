import { command } from "../../client";
import { Client, EmbedBuilder, Message } from "discord.js";

const cmd: command = {
  name: "user",
  description: "Display user info.",
  args: false,
  category: "basic",
  execute(message: Message, args: string[], client: Client) {
    const { createdAt, id, username, tag } = message.author;
    const icon = message.author.avatarURL();
    const emb = new EmbedBuilder()
      .setTitle(`User info for \`${username}\``)
      .setThumbnail(icon)
      .addFields([
        {
          name: "ID ",
          value: id,
        },
        {
          name: "Tag ",
          value: tag,
        },
        {
          name: "Created at ",
          value: createdAt.toString(),
        },
      ]);
    message.channel.send({ embeds: [emb] });
  },
};

export default cmd;
