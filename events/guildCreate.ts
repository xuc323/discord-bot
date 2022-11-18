import { event, MyClient } from "../type";
import { Guild } from "discord.js";

const e: event = {
  name: "guildCreate",
  execute(client: MyClient, guild: Guild) {
    guild.systemChannel?.send(
      "Thanks for inviting me to your server!\nCommands start with `!`. Type `!help` for more information."
    );
  },
};

export default e;
