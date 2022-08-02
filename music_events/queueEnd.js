const { Client } = require("discord.js");
const { Queue } = require("discord-music-player");

module.exports = {
    name: "queueEnd",
    /**
     * 
     * @param {Queue} queue 
     * @param {Client} client
     */
    execute(queue, client) {
        queue.data?.msgChannel?.send("The queue has ended.");
    }
}