import { Client, EmbedBuilder, Message } from "discord.js";
import { command } from "../../client";

const cmd: command = {
  name: "server",
  description: "Display server info.",
  args: false,
  category: "basic",
  execute(message: Message, args: string[], client: Client) {
    const { name, memberCount, createdAt } = message.guild!;
    const icon = message.guild!.iconURL();
    const emb = new EmbedBuilder()
      .setTitle(`Server info for \`${name}\``)
      .setThumbnail(icon)
      .addFields([
        {
          name: "Members ",
          value: memberCount.toString(),
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
