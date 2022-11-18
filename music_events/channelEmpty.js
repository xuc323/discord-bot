const { Client } = require("discord.js");
const { Queue } = require("discord-music-player");

module.exports = {
    name: "channelEmpty",
    /**
     * 
     * @param {Queue} queue 
     * @param {Client} client
     */
    execute(queue, client) {
        queue.data?.msgChannel?.send("Everyone left the Voice Channel, queue ended.");
    }
}