import { Events, Interaction } from "discord.js";
import { event, MyClient } from "../type";

const e: event = {
  name: Events.InteractionCreate,
  execute(client: MyClient, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = client.commands?.get(interaction.commandName);
    if (!command) {
      console.log(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    // command.execute(interaction);
  },
};

export = e;
