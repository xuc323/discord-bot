module.exports = {
    name: "volume",
    description: "Adjust the volume of the music.",
    aliases: ["v"],
    args: true,
    usage: "[volume number]",
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            const vol = parseInt(args[0]);
            const status = guildQueue.setVolume(vol);
            if (status) {
                message.channel.send(`Volume set to ${vol}%.`);
            } else {
                message.channel.send("ERROR: Failed to set volume.");
            }
        } else {
            message.channel.send("ERROR: Queue is empty, can't perform \`volume\`.");
        }
    }
}