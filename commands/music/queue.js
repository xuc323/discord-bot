const { EmbedBuilder, Message, Client } = require("discord.js");
const { Player } = require("discord-music-player");

module.exports = {
    name: "queue",
    description: "List all songs in the queue. (Up to 25, default is 5)",
    aliases: ["q"],
    args: false,
    usage: "[number of songs]",
    category: "music",
    /**
     * display the queue
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     * @param {Player} client.player
     * @returns 
     */
    execute(message, args, client) {
        // check if the queue exists
        const queue = client.player.getQueue(message.guild.id);
        // create an embed message
        const emb = new EmbedBuilder()
            .setTitle(`Queue for ${message.guild.name}`);

        if (queue) { // the queue exists
            // display the voice channel for easy join
            emb.setDescription(`Playing in ${queue.connection.channel}`);
            // if no args or args is not number, default to 5, otherwise use args
            const limit = (args[0] && Number(args[0])) || 5;
            if (limit > 25) {
                // set limit to 25 because that's what discord allows
                return message.channel.send("The limit is 25.");
            }

            // set whichever is smaller
            const len = queue.songs.length > limit ? limit : queue.songs.length;
            for (let i = 0; i < len; i++) {
                const song = queue.songs[i];
                if (i === 0) {
                    // if it's the first song
                    emb.setThumbnail(song.thumbnail)
                        .addFields([{ name: "Now Playing", value: `**Name:** ${song.name}\n**Author:** ${song.author}\n**Link:** ${song.url}\n**Requested by:** ${song.requestedBy}` }]);
                } else {
                    emb.addFields([{ name: `#${i + 1}`, value: `**Name:** ${song.name}\n**Author:** ${song.author}\n**Link:** ${song.url}\n**Requested by:** ${song.requestedBy}` }]);
                }
            }
            emb.setFooter({ text: `Music count: ${queue.songs.length}` });
        } else { // the queue doesn't exist
            emb.setFooter({ text: "Queue is empty." });
        }
        message.channel.send({ embeds: [emb] });
    }
}