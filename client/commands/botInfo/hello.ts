import { Message, Client } from "discord.js";
import { command } from "../../client";

const cmd: command = {
  name: "hello",
  description: "Hello!",
  args: false,
  aliases: ["hi"],
  category: "greeting",
  execute(message: Message, args: string[], client: Client): void {
    message.channel.send(`Hi, ${message.author.username}!`);
  },
};

export default cmd;
