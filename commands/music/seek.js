module.exports = {
    name: "seek",
    description: "Fast forward the song.",
    args: true,
    aliases: ["fastforward", "ff"],
    usage: "[time in seconds]",
    execute(message, args, client) {
        // get queue for the guild id
        const guildQueue = client.player.getQueue(message.guild.id);

        if (guildQueue) {
            // the queue exists
            // retrive the initial message channel from the queue
            const channel = guildQueue.data.msgChannel;
            if (message.channel === channel) {
                // the message is from the same channel the queue was created
                const time = parseInt(args[0]);
                const status = guildQueue.seek(time * 1000);
                if (status) {
                    message.channel.send(`Fast forwarded ${time} seconds`);
                } else {
                    message.channel.send("ERROR: Failed to fast forward.");
                }
            } else {
                // the message is not from the same channel the queue was created
                message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${channel} for music commands.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("ERROR: Queue is empty, can't perform \`seek/fastforward\`.");
        }
    }
}