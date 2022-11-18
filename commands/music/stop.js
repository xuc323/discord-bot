module.exports = {
    name: "stop",
    description: "Stop the music and leave the voice channel.",
    aliases: ["s"],
    args: false,
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            guildQueue.stop();
            message.channel.send("Music stopped, the Queue is cleared!");
        } else {
            message.channel.send("ERROR: Queue is empty, can't perform \`stop\`.")
        }
    }
}