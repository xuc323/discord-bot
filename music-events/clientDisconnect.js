module.exports = {
    name: "clientDisconnect",
    execute(message, queue) {
        message.channel.send("I was kicked from the Voice Channel, queue ended.");
    }
}