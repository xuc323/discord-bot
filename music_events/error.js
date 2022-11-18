const { Client } = require("discord.js");
const { Queue } = require("discord-music-player");

module.exports = {
    name: "error",
    /**
     * 
     * @param {Error} error 
     * @param {Queue} queue 
     * @param {Client} client
     */
    execute(error, queue, client) {
        queue.data?.msgChannel?.send(`ERROR: an unknown error occured..`);
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: MUSIC EVENT ERROR: ${error.name} ${error.message}`);
    }
}