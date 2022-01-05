module.exports = {
    name: "play",
    description: "Play the music by name or url.",
    aliases: ["p"],
    args: true,
    usage: "[song name or url]",
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

        if (message.member.voice.channel) {
            // the user is in any voice channel
            queue.join(message.member.voice.channel).then(() => {
                if (message.channel === queue.data.msgChannel) {
                    queue.play(args.join(" "), {
                        requestedBy: message.author.tag
                    }).catch(() => {
                        if (!guildQueue) {
                            queue.stop();
                        }
                    });
                } else {
                    // the message is not from the same channel the queue was created
                    message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${queue.data.msgChannel} for music commands.`);
                }
            }).catch(err => console.log(err));
        } else {
            // the user is not in any voice channel
            message.channel.send("ERROR: Please join one of the voice channels before playing music.");
        }
    }
}