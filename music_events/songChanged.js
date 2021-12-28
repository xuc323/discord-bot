module.exports = {
    name: "songChanged",
    execute(queue, newSong, oldSong) {
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${newSong.requestedBy}]: ${newSong} is now playing.`);
    }
}