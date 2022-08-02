const { EmbedBuilder, Message, Client } = require("discord.js");

module.exports = {
    name: "user",
    description: "Display user info.",
    args: false,
    category: "basic",
    /**
     * display user info in an embed message
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     */
    execute(message, args, client) {
        const { createdAt, id, username, tag } = message.author;
        const emb = new EmbedBuilder()
            .setTitle(`User info for \`${username}\``)
            .setThumbnail(message.author.avatarURL())
            .addFields(
                [{
                    name: "ID ",
                    value: id
                },
                {
                    name: "Tag ",
                    value: tag
                },
                {
                    name: "Created at ",
                    value: createdAt.toString()
                }]
            );
        message.channel.send({ embeds: [emb] });
    }
}