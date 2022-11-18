const prefix = process.env.PREFIX;

module.exports = {
    name: "message",
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
        const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        // if unknown command
        if (!command) {
            return message.reply(`Unknown command: \`${message.content}\`. Type \`${prefix}help\` for more information.`);
        }

        // if command needs argument but there's none
        if (command.args && !args.length) {
            let reply = message.reply("You did not provide any arguments.");
            if (command.usage) {
                reply += `\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.reply(reply);
        }

        // execute command
        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply("There was an error trying to execute that command..");
        }
    }
}