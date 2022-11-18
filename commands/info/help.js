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
            data.push("Here's a list of all commands: ");
            data.push(commands.map(command => command.name).join(", "));
            data.push(`\nYou can send\`${prefix}help [command name]\` to get info on a specific command.`);
            return message.author.send(data, { split: true }).then(function () {
                if (message.channel.type === "dm") {
                    return;
                }
                message.reply("I've sent you a DM with all commands!");
            }).catch(function (err) {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply("It seems like I can't DM you! Do you have DMs disabled?");
            });
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
                data.push(`**Usage:** ${predix}${command.name} ${command.usage}`);
            }
            message.reply(data, { split: true });
        }
    }
}