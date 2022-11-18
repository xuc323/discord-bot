module.exports = {
    name: "queueEnd",
    execute(message, queue) {
        message.channel.send("The queue has ended!");
    }
}