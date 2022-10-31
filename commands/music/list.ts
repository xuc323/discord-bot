import { Message } from "discord.js";
import { command, MyClient } from "../../type";

const cmd: command = {
  name: "list",
  description: "(beta)",
  args: false,
  execute(message: Message, args: string[], client: MyClient) {
    message.channel.send(
      "This command is currently under development, check back later!"
    );
  },
};

export default cmd;