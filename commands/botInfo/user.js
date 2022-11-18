const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    description: "Display user info.",
    args: false,
    category: "basic",
    execute(message, args, client) {
        const { createdAt, id, username, tag } = message.author;
        const icon = message.author.avatarURL();
        const emb = new MessageEmbed()
            .setTitle(`User info for \`${username}\``)
            .setThumbnail(icon)
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