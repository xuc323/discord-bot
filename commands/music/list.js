const { Message, Client } = require("discord.js");

module.exports = {
    name: "list",
    description: "(beta)",
    args: false,
    category: "music",
    /**
     * each user's own playlist
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     */
    execute(message, args, client) {
        message.channel.send("This command is currently under development, check back later!");
    }
}