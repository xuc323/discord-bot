const { RepeatMode } = require("discord-music-player");

module.exports = {
    name: "loop",
    description: "Loop the queue.",
    aliases: ["l"],
    args: false,
    execute(message, args, client) {
        // get queue for the guild id
        const guildQueue = client.player.getQueue(message.guild.id);

        if (guildQueue) {
            // the queue exists
            // retrive the initial message channel from the queue
            const channel = guildQueue.data.msgChannel;
            if (message.channel === channel) {
                // the message is from the same channel the queue was created
                const status = guildQueue.setRepeatMode(RepeatMode.QUEUE); // set repeat mode to QUEUE
                if (status) {
                    message.channel.send("Now looping the queue!");
                } else {
                    message.channel.send("ERROR: Failed to loop the queue.");
                }
            } else {
                // the message is not from the same channel the queue was created
                message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${channel} for music commands.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("ERROR: Queue is empty, can't perform \`loop\`.");
        }
    }
}