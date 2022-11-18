import { EmbedBuilder, Message } from "discord.js";
import { command, MyClient } from "../../type";

const cmd: command = {
  name: "server",
  description: "Display server info.",
  args: false,
  execute(message: Message, args: string[], client: MyClient) {
    const { name, memberCount, createdAt } = message.guild!;
    const emb = new EmbedBuilder()
      .setTitle(`Server info for \`${name}\``)
      .setThumbnail(message.guild!.iconURL())
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
