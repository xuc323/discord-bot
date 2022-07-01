const { RepeatMode } = require("discord-music-player");
const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "repeat",
    description: "Repeat the current song.",
    aliases: ["r"],
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
            const status = queue.setRepeatMode(RepeatMode.SONG); // set repeat mode to SONG
            if (status) {
                message.channel.send("MUSIC STATUS: Now repeating the current song!");
            } else {
                message.channel.send("ERROR: Failed to repeat the current song. Try again later.");
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`repeat\`.");
        }
    }
}