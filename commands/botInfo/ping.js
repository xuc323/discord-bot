module.exports = {
    name: "ping",
    description: "Return bot's latency in ms.",
    args: false,
    category: "basic",
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