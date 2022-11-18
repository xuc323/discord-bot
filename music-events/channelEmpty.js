module.exports = {
    name: "channelEmpty",
    execute(message, queue) {
        message.channel.send("Everyone left the Voice Channel. I have removed the music.");
    }
}