module.exports = {
    name: "server",
    description: "Server info",
    execute(message, args) {
        message.reply(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer created on: ${message.guild.createdAt}\nServer region: ${message.guild.region}`);
    }
}