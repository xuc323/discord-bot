const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "server",
    description: "Display server info.",
    args: false,
    execute(message, args) {
        const { name, region, memberCount, icon, createdAt } = message.guild;
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
                name: "Create at ",
                value: createdAt
            }
        );
        message.channel.send(emb);
    }
}