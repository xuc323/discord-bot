module.exports = {
    name: "ping",
    description: "Return bot's ping in ms",
    args: false,
    execute(message, args, prefix, client) {
        let ping = client.ws.ping;
        message.reply("Pinging...").then((sent) => {
            sent.edit(`Websocket heartbeat: ${ping}ms.\nRoundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms.`);
        });
    }
}