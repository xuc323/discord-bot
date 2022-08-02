const { Client } = require("discord.js");
const { Queue, Song } = require("discord-music-player");

module.exports = {
    name: "songChanged",
    /**
     * 
     * @param {Queue} queue 
     * @param {Song} newSong 
     * @param {Song} oldSong 
     * @param {Client} client
     */
    execute(queue, newSong, oldSon, client) {
        queue.data?.msgChannel?.send(`**${newSong}** is now playing.`);
    }
}