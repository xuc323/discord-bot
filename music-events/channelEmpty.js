module.exports = {
    name: "channelEmpty",
    execute(message, queue) {
        message.channel.send("The channel is empty, I have removed the music.");
    }
}