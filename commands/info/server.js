const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "server",
    description: "Display server info.",
    args: false,
    execute(message, args, client) {
        const { name, region, memberCount, createdAt } = message.guild;
        const icon = message.guild.iconURL();
        const emb = new MessageEmbed().setTitle(`Server info for \`${name}\``).setThumbnail(icon).addFields(
            {
                name: "Members ",
                value: memberCount
            },
            {
                name: "Region ",
                value: region
            },
            {
                name: "Created at ",
                value: createdAt
            }
        );
        message.channel.send(emb);
    }
}