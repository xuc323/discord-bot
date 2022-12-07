import {
  CommandInteraction,
  Events,
  Message,
  SlashCommandBuilder,
} from "discord.js";
import { MyClient, command, slashCmd } from "../../type";

const basic: command = {
  name: "hello",
  description: "Hello!",
  args: false,
  aliases: ["hi"],
  execute(message: Message, args: string[], client: MyClient) {
    message.channel.send(`Hi, ${message.author.username}!`);
    client.on(Events.InteractionCreate, (c) => {});
  },
};

const slash: slashCmd = {
  data: new SlashCommandBuilder().setName("hello").setDescription("Hello!"),
  execute(interaction: CommandInteraction) {
    interaction.reply(`Hi, ${interaction.user.username}`);
  },
};

export { basic, slash };
