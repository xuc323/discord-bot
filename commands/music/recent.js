const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "recent",
    description: "Print the last 10 songs played. (Up to 25, default is 5)",
    args: false,
    usage: "[number of songs]",
    execute(message, args, client, guildQueue) {
        const emb = new MessageEmbed()
            .setTitle(`Recently played songs for ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL());
        const limit = args[0] || 5;
        if (limit > 25) {
            return message.channel.send("The limit is 25.");
        }

        client.postgres.getRecentSongs(message.guild.id, limit).then(songs => {
            for (let i = 0; i < songs.rows.length; i++) {
                const song = songs.rows[i];
                emb.addField(`#${i + 1}`, `**Name: **${song.name}\n**Author: **${song.author}\n**Url: **${song.url}\n**Requested By: **<@${song.id}>\n**Requested At: **${song.date}\n`);
            }
            message.channel.send({ embeds: [emb] });
        }).catch(err => {
            message.channel.send(err.message);
            console.log(err);
        });
    }
}
