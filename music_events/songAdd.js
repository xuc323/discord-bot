module.exports = {
    name: "songAdd",
    execute(queue, song) {
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy}]: Song ${song} was added to the queue.`);
    }
}