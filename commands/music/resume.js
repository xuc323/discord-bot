const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "resume",
    description: "Resume the current song.",
    aliases: ["c", "continue"],
    args: false,
    execute(message, args, client) {

        let queue; // the queue instance might be undefined
        try {
            queue = queueCheck(message, client);
        } catch (err) {
            return message.channel.send(err.message);
        }

        if (guildQueue) {
            // the queue exists
            const status = queue.setPaused(false);
            if (!status) {
                message.channel.send("MUSIC STATUS: The queue is now resumed!");
            } else {
                message.channel.send("ERROR: Failed to resume the queue. Try again later.");
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`resume/continue\`.");
        }
    }
}