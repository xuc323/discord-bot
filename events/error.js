const { Client } = require("discord.js");

module.exports = {
    name: "error",
    /**
     * 
     * @param {Error} error 
     * @param {Client} client 
     */
    execute(error, client) {
        console.log(`BOT ERROR: ${error.name} ${error.message}`);
    }
}