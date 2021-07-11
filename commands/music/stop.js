module.exports = {
    name: "stop",
    description: "Stop the music and leave the voice channel",
    aliases: ["s"],
    args: false,
    execute(message, args, client) {
        const isDone = client.player.stop(message);
        if (isDone) {
            message.channel.send("Music stopped, the Queue was cleared!");
        }
    }
}