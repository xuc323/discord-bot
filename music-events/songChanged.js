module.exports = {
    name: "songChanged",
    execute(message, newSong, oldSong) {
        message.channel.send(`**${newSong.name}** is now playing!`);
    }
}