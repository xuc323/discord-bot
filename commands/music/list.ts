import { Message, TextChannel } from "discord.js";
import { command, MyClient } from "../../type";

const basic: command = {
  name: "list",
  description: "(dev)",
  args: false,
  execute(message: Message, args: string[], client: MyClient) {
    (message.channel as TextChannel).send(
      "This command is currently under development, check back later!"
    );
  },
};

export { basic };
