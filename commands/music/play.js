const { Message, Client } = require("discord.js");

module.exports = {
    name: "play",
    description: "Play the music by name or url.",
    aliases: ["p"],
    args: true,
    usage: "[song name or url]",
    category: "music",
    /**
     * search for a song and add it to the queue
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     * @returns 
     */
    execute(message, args, client) {
        // create queue if not exists, otherwise get the queue
        const queue = client.player.createQueue(message.guild.id, {
            data: {
                msgChannel: message.channel
            }
        });

        queue.join(message.member.voice.channel).then(() => {
            if (queue.connection.channel != message.member.voice.channel) {
                // the user is not in the same voice channel as the bot
                return message.channel.send(`Music is playing in ${queue.connection.channel}. Join or wait for it to finish.`);
            }
            // the user is in the same voice channel as the bot
            // add music to the queue
            queue.play(args.join(" "), {
                requestedBy: message.author
            }).catch((err) => {
                console.log(`MUSIC PLAY ERROR: ${err}`);
                message.channel.send(err);
            });
        }).catch((err) => {
            console.log(`MUSIC JOIN ERROR: ${err}`);
            message.channel.send(err);
        });
    }
}