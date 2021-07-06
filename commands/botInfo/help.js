const prefix = process.env.PREFIX;

module.exports = {
    name: "help",
    description: "List all commands or info about a specific command.",
    usage: "[command name]",
    execute(message, args) {
        const data = [];
        const { commands } = message.client;
        if (!args.length) {
            data.push("Supported commands:\n");
            data.push(commands.map(command => `**${command.name}** ${command.description}`).join("\n"));
            data.push(`\nYou can send\`${prefix}help [command name]\` to get info on a specific command.`);
            message.channel.send(data, { split: true });
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
                return message.reply("That's not a valid command!");
            }
            data.push(`**Name:** ${command.name}`);
            if (command.aliases) {
                data.push(`**Aliases:** ${command.aliases.join(", ")}`);
            }
            if (command.description) {
                data.push(`**Description:** ${command.description}`);
            }
            if (command.usage) {
                data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);
            } else {
                data.push(`**Usage:** \`${prefix}${command.name}\``);
            }
            message.channel.send(data, { split: true });
        }
    }
}