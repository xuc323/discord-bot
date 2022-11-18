const { Guild, Client } = require("discord.js");

module.exports = {
    name: "guildCreate",
    /**
     * 
     * @param {Guild} guild 
     * @param {Client} client 
     */
    execute(guild, client) {
        guild.systemChannel?.send("Thanks for inviting me to your server!\nCommands start with `!`. Type `!help` for more information.");
    }
}