module.exports = {
    name: "server",
    description: "Display server info.",
    args: false,
    execute(message, args) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer created on: ${message.guild.createdAt}\nServer region: ${message.guild.region}`);
    }
}