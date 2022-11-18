const prefix = process.env.PREFIX;

module.exports = {
    name: "messageCreate",
    execute(message, client) {
        // bot will not respond to message without prefix "!" or message from itself
        if (!message.content.startsWith(prefix) || message.author.bot) {
            return;
        }
        // if commands are sent through dm
        if (!message.guild) {
            return message.channel.send("Commands can only be executed in one of the channels.");
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // search the command by looking for the command name and aliases
        const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        // if unknown command
        if (!command) {
            return message.channel.send(`Unknown command: \`${message.content}\`. Type \`${prefix}help\` for more information.`);
        }

        // if the command needs argument but there's none
        if (command.args && !args.length) {
            let reply = "You did not provide any arguments.";
            if (command.usage) {
                reply += `\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        // execute command
        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.channel.send("There was an error trying to execute that command..");
        }
    }
}