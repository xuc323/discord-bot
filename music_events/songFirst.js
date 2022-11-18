module.exports = {
    name: "songFirst",
    execute(queue, song) {
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy}]: Started playing ${song}.`);
    }
}