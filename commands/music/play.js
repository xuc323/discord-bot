module.exports = {
    name: "play",
    description: "Play the music by name or url.",
    aliases: ["p"],
    args: true,
    usage: "[song name or url]",
    execute(message, args, client) {
        // check if the user is in a voice channel
        if (!message.member.voice.channel) {
            return message.channel.send("You must be in a voice channel to play music.");
        }
        /**
         * create the queue by using the guild id.
         * assign the initial message channel so only
         * messages from here will be considered for music
         */
        const queue = client.player.createQueue(message.guild.id, {
            data: {
                msgChannel: message.channel
            }
        });

        queue.join(message.member.voice.channel).then(() => {
            // check if the message is from the initial message channel
            if (message.channel != queue.data.msgChannel) {
                return message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${queue.data.msgChannel} for music commands.`);
            }

            // check if the user is in the same voice channel as the bot
            if (message.member.voice.channel.id != queue.connection.channel.id) {
                return message.channel.send(`You are in a different voice channel.\nPlease join ${queue.connection.channel} to play music.`);
            }

            // add music to the queue
            queue.play(args.join(" "), {
                requestedBy: message.author
            }).catch(err => message.channel.send(err.message));
        }).catch(err => message.channel.send(err.message));
    }
}