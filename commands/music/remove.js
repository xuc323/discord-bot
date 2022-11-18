module.exports = {
    name: "remove",
    description: "Remove the music from the queue.",
    aliases: ["delete", "d"],
    args: true,
    usage: "[music number]",
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            const num = parseInt(args[0]);
            const song = guildQueue.remove(num - 1);
            if (song) {
                message.channel.send(`Song ${song.name} is removed from the queue.`);
            } else {
                message.channel.send(`ERROR: Can't remove the song at index \`${num}\``);
            }
        } else {
            message.channel.send("ERROR: Queue is empty, can't perform \`delete/remove\`.");
        }
    }
}