const { Client } = require("discord.js");
const { Queue, Song } = require("discord-music-player");

module.exports = {
    name: "songFirst",
    /**
     * 
     * @param {Queue} queue 
     * @param {Song} song 
     * @param {Client} client
     */
    execute(queue, song, client) {
        queue.data?.msgChannel?.send(`Started playing **${song}**.`);
    }
}