module.exports = {
    name: "volume",
    description: "Adjust the volume of the music.",
    aliases: ["v"],
    args: true,
    usage: "[volume number]",
    execute(message, args, client) {
        // get queue for the guild id
        const guildQueue = client.player.getQueue(message.guild.id);

        if (guildQueue) {
            // the queue exists
            // retrive the initial message channel from the queue
            const channel = guildQueue.data.msgChannel;
            if (message.channel === channel) {
                // the message is from the same channel the queue was created
                const vol = parseInt(args[0]);
                const status = guildQueue.setVolume(vol);
                if (status) {
                    message.channel.send(`Volume set to ${vol}%.`);
                } else {
                    message.channel.send("ERROR: Failed to set volume.");
                }
            } else {
                // the message is not from the same channel the queue was created
                message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${channel} for music commands.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("ERROR: Queue is empty, can't perform \`volume\`.");
        }
    }
}