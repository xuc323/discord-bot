import { Message } from "discord.js";
import { client, command } from "../../client";
// obtain prefix from the environment
const prefix: string = process.env.PREFIX ?? "!";

const cmd: command = {
  name: "help",
  description: "List all commands or info about a specific command.",
  usage: "[command name]",
  aliases: ["h"],
  category: "basic",
  execute(message: Message, args: string[], client: client) {
    // contains all the commands and descriptions
    const data = [];
    const { commands } = message.client as client;
    if (!args.length) {
      // no args, return all commands
      data.push("Supported commands:\n");
      // object to store different categories of commands
      const category: {
        basic: { message: string; cmd: string[] };
        music: { message: string; cmd: string[] };
        other: { message: string; cmd: string[] };
      } = {
        basic: { message: "Basic commands", cmd: [] },
        music: { message: "Music commands", cmd: [] },
        other: { message: "Other commands", cmd: [] },
      };

      // for each command, add to the correct category
      commands!.forEach((command: command) => {
        switch (command.category) {
          case "basic":
            category.basic.cmd.push(
              `\t**${command.name}** ${command.description}`
            );
            break;
          case "music":
            category.music.cmd.push(
              `\t**${command.name}** ${command.description}`
            );
            break;
          default:
            category.other.cmd.push(
              `\t**${command.name}** ${command.description}`
            );
            break;
        }
      });

      // push to data to send back
      let k: keyof typeof category;
      for (k in category) {
        data.push(`**${category[k].message}**:`);
        data.push(category[k].cmd.join("\n"));
      }

      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info of a specific command.`
      );
    } else {
      // args, return the specific command
      const name = args[0].toLowerCase();
      // find if the command exists or the aliases exist
      const command =
        commands!.get(name) ||
        (commands!.find(
          (c: any) => c.aliases && c.aliases.includes(name)
        ) as command);

      if (!command) {
        // the command doesn't exist, send error message to channel
        return message.channel.send(
          `\`${args[0]}\` is not a valid command. Type \`${prefix}help\` for more information.`
        );
      }

      // command exists
      data.push(`**Name:** ${command.name}`);
      if (command.aliases) {
        // the command has aliases, include in data
        data.push(`**Aliases:** ${command.aliases.join(", ")}`);
      }
      if (command.description) {
        // the command has description, include in data
        data.push(`**Description:** ${command.description}`);
      }
      if (command.category) {
        // the command has category, include in data
        data.push(`**Category**: ${command.category}`);
      }
      if (command.usage) {
        // the command has usage, include in data "command + usage"
        data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);
      } else {
        // the command doesn't have usage, include in data "command"
        data.push(`**Usage:** \`${prefix}${command.name}\``);
      }
    }
    // send the message to the channel
    message.channel.send(data.join("\n"));
  },
};

export default cmd;
