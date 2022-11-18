const { Client } = require("discord.js");
const { Queue } = require("discord-music-player");

module.exports = {
    name: "clientDisconnect",
    /**
     * 
     * @param {Queue} queue 
     * @param {Client} client
     */
    execute(queue, client) {
        queue.data?.msgChannel?.send("I was kicked from the Voice Channel, queue ended.");
    }
}