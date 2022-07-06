const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "next",
    description: "Skip to the next song.",
    aliases: ["n", "skip"],
    args: false,
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
            const song = queue.skip();
            if (song) {
                message.channel.send(`MUSIC STATUS: **${song}** is skipped!`);
            } else {
                message.channel.send("ERROR: Failed to skip a song. Try again later.");
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`skip/next\`.");
        }
    }
}