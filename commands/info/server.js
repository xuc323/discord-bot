module.exports = {
    name: "server",
    description: "Display server info.",
    args: false,
    execute(message, args) {
        message.reply(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer created on: ${message.guild.createdAt}\nServer region: ${message.guild.region}`);
    }
}