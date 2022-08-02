const { EmbedBuilder, Message, Client } = require("discord.js");

module.exports = {
    name: "server",
    description: "Display server info.",
    args: false,
    category: "basic",
    /**
     * display server info in an embed message
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     */
    execute(message, args, client) {
        const { name, memberCount, createdAt } = message.guild;
        const emb = new EmbedBuilder()
            .setTitle(`Server info for \`${name}\``)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                [{
                    name: "Members ",
                    value: memberCount.toString()
                },
                {
                    name: "Created at ",
                    value: createdAt.toString()
                }]
            );
        message.channel.send({ embeds: [emb] });
    }
}