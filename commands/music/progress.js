const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "progress",
    description: "Create a progress bar for the current song.",
    aliases: ["prog"],
    args: false,
    execute(message, args, client) {

        let queue; // the queue instance might be undefined
        try {
            queue = queueCheck(message, client);
        } catch (err) {
            return message.channel.send(err.message);
        }

        if (queue) {
            // the queue exists
            const bar = queue.createProgressBar();
            if (bar) {
                message.channel.send(bar.prettier);
            } else {
                message.channel.send("ERROR: Failed to create progress bar. Try again later.");
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`progress\`.");
        }
    }
}