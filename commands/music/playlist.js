module.exports = {
    name: "playlist",
    description: "Play the music in the playlist by url.",
    aliases: ["pl"],
    args: true,
    usage: "[playlist url]",
    execute(message, args, client, guildQueue) {
        /*
            create the queue by using the guild id.
            assign the initial message channel so only 
            messages from here will be considered for music
        */
        const queue = client.player.createQueue(message.guild.id, {
            data: {
                msgChannel: message.channel
            }
        });

        queue.join(message.member.voice.channel).then(() => {
            if (message.channel === queue.data.msgChannel) {
                // the message is from the same channel the queue was created
                queue.playlist(args.join(" "), {
                    requestedBy: message.author
                }).catch(err => message.channel.send(err.message));
            } else {
                // the message is not from the same channel the queue was created
                message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${queue.data.msgChannel} for music commands.`);
            }
        }).catch(err => message.channel.send(err.message));
    }
}