const { Client } = require("discord.js");
const { Queue, Playlist } = require("discord-music-player");

module.exports = {
    name: "playlistAdd",
    /**
     * 
     * @param {Queue} queue 
     * @param {Playlist} playlist 
     * @param {Client} client
     */
    execute(queue, playlist, client) {
        queue.data?.msgChannel?.send(`**${playlist.name}** has been added to the queue.\n${playlist.url}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${playlist.songs[0].requestedBy.tag}]: ${playlist} ${playlist.url}`);
    }
}