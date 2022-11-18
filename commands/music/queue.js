const { MessageEmbed } = require("discord.js");
const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "queue",
    description: "List all songs in the queue. (Up to 25, default is 5)",
    aliases: ["q"],
    args: false,
    usage: "[number of songs]",
    category: "music",
    execute(message, args, client) {

        let queue; // the queue instance might be undefined
        try {
            queue = queueCheck(message, client);
        } catch (err) {
            return message.channel.send(err.message);
        }

        // create an embed message
        const emb = new MessageEmbed()
            .setTitle(`Queue for ${message.guild.name}`);

        // if no args or args is not number, default to 5, otherwise use args
        const limit = (args[0] && !isNaN(args[0])) || 5;
        if (limit > 25) {
            // set limit to 25 because that's what discord allows
            return message.channel.send("The limit is 25.");
        }

        if (queue) {
            // the queue exists
            // set whichever is smaller
            const len = queue.songs.length > limit ? limit : queue.songs.length;
            for (let i = 0; i < len; i++) {
                const song = queue.songs[i];
                if (i === 0) {
                    // if it's the first song
                    emb.setThumbnail(song.thumbnail)
                        .addField("Now Playing", `**Name:** ${song.name}\n**Author:** ${song.author}\n**Link:** ${song.url}\n**Requested by:** ${song.requestedBy}`);
                } else {
                    emb.addField(`#${i + 1}`, `**Name:** ${song.name}\n**Author:** ${song.author}\n**Link:** ${song.url}\n**Requested by:** ${song.requestedBy}`);
                }
            }
            emb.setFooter({ text: `Music count: ${queue.songs.length}` });
        } else {
            // the queue doesn't exist
            emb.setFooter({ text: "Queue is empty." });
        }
        message.channel.send({ embeds: [emb] });
    }
}