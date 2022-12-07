import { Message } from "discord.js";
import { MyClient, command } from "../../type";

const cmd: command = {
  name: "hello",
  description: "Hello!",
  args: false,
  aliases: ["hi"],
  execute(message: Message, args: string[], client: MyClient) {
    message.channel.send(`Hi, ${message.author.username}!`);
  },
};

export = cmd;
