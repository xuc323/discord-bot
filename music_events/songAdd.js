const { Client } = require("discord.js");
const { Queue, Song } = require("discord-music-player");

module.exports = {
    name: "songAdd",
    /**
     * 
     * @param {Queue} queue 
     * @param {Song} song 
     * @param {Client} client
     */
    execute(queue, song, client) {
        queue.data?.msgChannel?.send(`**${song.name}** has been added to the queue.\n${song.url}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy.tag}]: ${song} ${song.url}`);
    }
}