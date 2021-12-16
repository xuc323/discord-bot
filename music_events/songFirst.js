module.exports = {
    name: "songFirst",
    execute(message, song) {
        message.channel.send(`**${song.name}** is now playing!`);
    }
}