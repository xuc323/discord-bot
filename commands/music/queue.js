const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "List all songs in the queue.",
    aliases: ["q"],
    args: false,
    execute(message, args, client, guildQueue) {
        const emb = new MessageEmbed().setTitle(`Queue for ${message.guild.name}`);
        if (guildQueue) {
            // the queue exists
            // retrive the initial message channel from the queue
            const channel = guildQueue.data.msgChannel;
            if (message.channel === channel) {
                // the message is from the same channel the queue was created
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
                // the message is not from the same channel the queue was created
                return message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${channel} for music commands.`);
            }
        } else {
            // the queue doesn't exist
            emb.setFooter({ text: "Queue is empty." });
        }
        message.channel.send({ embeds: [emb] });
    }
}