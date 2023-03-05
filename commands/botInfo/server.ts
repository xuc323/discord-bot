import {
  CommandInteraction,
  EmbedBuilder,
  Message,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { command, MyClient, slashCmd } from "../../type";

const basic: command = {
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
    (message.channel as TextChannel).send({ embeds: [emb] });
  },
};

const slash: slashCmd = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Display server info."),
  execute(interaction: CommandInteraction) {
    const { name, memberCount, createdAt } = interaction.guild!;
    const emb = new EmbedBuilder()
      .setTitle(`Server info for \`${name}\``)
      .setThumbnail(interaction.guild!.iconURL())
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
    interaction.reply({ embeds: [emb] });
  },
};

export { basic, slash };
