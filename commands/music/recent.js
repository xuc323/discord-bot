const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "recent",
    description: "Print the songs played previously. (Up to 25, default is 5)",
    args: false,
    usage: "[number of songs]",
    execute(message, args, client) {
        // create an embed message
        const emb = new MessageEmbed()
            .setTitle(`Recently played songs for ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL());

        // if no args or args is not number, default to 5, otherwise use args
        const limit = (args[0] && !isNaN(args[0])) || 5;
        if (limit > 25) {
            // set limit to 25 because that's what discord allows
            return message.channel.send("The limit is 25.");
        }

        client.postgres.getRecentSongs(message.guild.id, limit).then(songs => {
            // get whichever is smaller
            const len = songs.rows.length > limit ? limit : songs.rows.length;
            for (let i = 0; i < len; i++) {
                const song = songs.rows[i];
                emb.addField(`#${i + 1}`, `**Name: **${song.name}\n**Author: **${song.author}\n**Url: **${song.url}\n**Requested By: **<@${song.id}>\n**Requested At: **${song.date}\n`);
            }
            emb.setFooter({ text: `Count: ${songs.rows.length}` });
            message.channel.send({ embeds: [emb] });
        }).catch((err) => {
            message.channel.send(err.message);
            console.log(err);
        });
    }
}
