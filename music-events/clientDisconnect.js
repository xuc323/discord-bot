module.exports = {
    name: "clientDisconnect",
    execute(message, queue) {
        message.channel.send("I was disconnected!");
    }
}