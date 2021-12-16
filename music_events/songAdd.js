module.exports = {
    name: "songAdd",
    execute(message, queue, song) {
        message.channel.send(`**${song.name}** has been added to the queue\n${song.url}`);
    }
}