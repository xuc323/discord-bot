const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Return bot's latency in ms.",
    args: false,
    category: "basic",
    /**
     * test the bot's latency
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     */
    execute(message, args, client) {
        // create ping
        let ping = client.ws.ping;
        // send the placeholder
        message.channel.send("Pinging...").then((sent) => {
            // modify the message with latency status
            sent.edit(`Websocket heartbeat: ${ping}ms.\nRoundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms.`);
        });
    }
}