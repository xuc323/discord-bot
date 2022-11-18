const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "List all songs in the queue.",
    aliases: ["q"],
    args: false,
    execute(message, args, client, guildQueue) {
        const emb = new MessageEmbed().setTitle(`Queue for ${message.guild.name}`);
        if (guildQueue) {
            for (let i = 0; i < guildQueue.songs.length && i < 10; i++) {
                const song = guildQueue.songs[i];
                if (i === 0) {
                    emb.setThumbnail(song.thumbnail)
                        .addField("Now Playing", `**Name:** ${song.name}\n**Author:** ${song.author}\n**Link:** ${song.url}\n**Requested by:** ${song.requestedBy}`);
                } else {
                    emb.addField(`#${i + 1}`, `**Name:** ${song.name}\n**Author:** ${song.author}\n**Link:** ${song.url}\n**Requested by:** ${song.requestedBy}`);
                }
            }
            emb.setFooter({ text: `Music count: ${guildQueue.songs.length}` });
        } else {
            emb.setFooter({ text: "Queue is empty." });
        }
        message.channel.send({ embeds: [emb] });
    }
}