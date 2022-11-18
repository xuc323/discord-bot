module.exports = {
    name: "songChanged",
    execute(queue, newSong, oldSong) {
        queue.data?.msgChannel?.send(`**${newSong}** is now playing.`);
    }
}