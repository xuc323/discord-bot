const prefix = process.env.PREFIX;

module.exports = {
    name: "help",
    description: "List all commands or info about a specific command.",
    aliases: ["commands"],
    usage: "[command name]",
    execute(message, args) {
        const data = [];
        const { commands } = message.client;
        if (!args.length) {
            data.push("\nHere's a list of all commands: ");
            data.push(commands.map(command => command.name).join(", "));
            data.push(`\nYou can send\`${prefix}help [command name]\` to get info on a specific command.`);
            return message.reply(data, { split: true });
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
                return message.reply("That's not a valid command!");
            }
            data.push(`\n**Name:** ${command.name}`);
            if (command.aliases) {
                data.push(`**Aliases:** ${command.aliases.join(", ")}`);
            }
            if (command.description) {
                data.push(`**Description:** ${command.description}`);
            }
            if (command.usage) {
                data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
            } else {
                data.push(`**Usage:** ${prefix}${command.name}`);
            }
            message.reply(data, { split: true });
        }
    }
}