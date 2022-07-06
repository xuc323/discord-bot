const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "remove",
    description: "Remove the music from the queue.",
    aliases: ["delete", "d"],
    args: true,
    usage: "[music number]",
    category: "music",
    execute(message, args, client) {

        let queue; // the queue instance might be undefined
        try {
            queue = queueCheck(message, client);
        } catch (err) {
            return message.channel.send(err.message);
        }

        if (queue) {
            // the queue exists
            if (isNaN(args[0])) {
                return message.channel.send("ERROR: The argument can only be a number.");
            }

            const num = parseInt(args[0]);
            if (num < 1) {
                return message.channel.send("ERROR: Song number can only be greater than 1.");
            } else if (num === 1) {
                return message.channel.send("WARNING: Can't remove the song that is currently playing. Use \`skip\` instead.");
            }

            const song = guildQueue.remove(num - 1);
            if (song) {
                message.channel.send(`Song ${song.name} is removed from the queue.`);
            } else {
                message.channel.send(`ERROR: Can't remove the song at index \`${num}\`. Try again later.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`delete/remove\`.");
        }
    }
}