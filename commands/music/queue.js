const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "List all songs in the queue. (Up to 25, default is 5)",
    aliases: ["q"],
    args: false,
    usage: "[number of songs]",
    execute(message, args, client) {
        // get queue for the guild id
        const guildQueue = client.player.getQueue(message.guild.id);
        // create an embed message
        const emb = new MessageEmbed()
            .setTitle(`Queue for ${message.guild.name}`);

        // if no args or args is not number, default to 5, otherwise use args
        const limit = (args[0] && !isNaN(args[0])) || 5;
        if (limit > 25) {
            // set limit to 25 because that's what discord allows
            return message.channel.send("The limit is 25.");
        }

        if (guildQueue) {
            // the queue exists
            // retrive the initial message channel from the queue
            const channel = guildQueue.data.msgChannel;
            if (message.channel === channel) {
                // the message is from the same channel the queue was created
                // set whichever is smaller
                const len = guildQueue.songs.length > limit ? limit : guildQueue.songs.length;
                for (let i = 0; i < len; i++) {
                    const song = guildQueue.songs[i];
                    if (i === 0) {
                        // if it's the first song
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