const { Message, Client } = require("discord.js");

module.exports = {
    name: "hello",
    description: "Hello!",
    args: false,
    aliases: ["hi"],
    category: "greeting",
    /**
     * basic hello command
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     */
    execute(message, args, client) {
        message.channel.send(`Hi, ${message.author.username}!`);
    }
}