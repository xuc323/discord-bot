const { Message, Client } = require("discord.js");

module.exports = {
    name: "playlist",
    description: "Play the music in the playlist by url.",
    aliases: ["pl"],
    args: true,
    usage: "[playlist url]",
    category: "music",
    /**
     * search for the playlist and add all to the queue
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
            // add playlist to the queue
            queue.playlist(args.join(" "), {
                requestedBy: message.author,
                shuffle: true
            }).catch((err) => {
                console.log(`MUSIC PLAY ERROR: ${err.name} ${err.message}`);
                message.channel.send(err.message);
            });
        }).catch((err) => {
            console.log(`MUSIC JOIN ERROR: ${err.name} ${err.message}`);
            message.channel.send(err.message);
        });
    }
}