module.exports = {
    name: "guildCreate",
    execute(guild, client) {
        guild.systemChannel?.send("Thanks for inviting me to your server!\nCommands start with `!`. Type `!help` for more information.");
    }
}