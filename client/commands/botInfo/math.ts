import { Client, Message } from "discord.js";
import { command } from "../../client";

const cmd: command = {
  name: "math",
  description: "Perform math calculation. (+-*/%^)",
  args: true,
  usage: "[num1] [operator] [num2]",
  category: "math",
  execute(message: Message, args: string[], client: Client) {
    if (args.length != 3) {
      return message.channel.send(
        `Please follow the format: \`${this.usage}\``
      );
    }
    if (!parseFloat(args[0]) || !parseFloat(args[2])) {
      return message.channel.send("Only numbers are allowed.");
    }
    switch (args[1]) {
      case "+":
        message.channel.send(
          `${args[0]} + ${args[2]} = ${
            parseFloat(args[0]) + parseFloat(args[2])
          }`
        );
        break;
      case "-":
        message.channel.send(
          `${args[0]} - ${args[2]} = ${
            parseFloat(args[0]) - parseFloat(args[2])
          }`
        );
        break;
      case "*":
        message.channel.send(
          `${args[0]} * ${args[2]} = ${
            parseFloat(args[0]) * parseFloat(args[2])
          }`
        );
        break;
      case "/":
        message.channel.send(
          `${args[0]} / ${args[2]} = ${
            parseFloat(args[0]) / parseFloat(args[2])
          }`
        );
        break;
      case "%":
        message.channel.send(
          `${args[0]} % ${args[2]} = ${
            parseFloat(args[0]) % parseFloat(args[2])
          }`
        );
        break;
      case "^":
        message.channel.send(
          `${args[0]} ^ ${args[2]} = ${Math.pow(
            parseFloat(args[0]),
            parseFloat(args[2])
          )}`
        );
        break;
      default:
        message.channel.send("Unknown operator.");
        break;
    }
  },
};
