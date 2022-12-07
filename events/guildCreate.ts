import { event, MyClient } from "../type";
import { Events, Guild } from "discord.js";

const e: event = {
  name: Events.GuildCreate,
  execute(client: MyClient, guild: Guild) {
    guild.systemChannel?.send(
      "Thanks for inviting me to your server!\nCommands start with `!`. Type `!help` for more information."
    );
  },
};

export = e;
