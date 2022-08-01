module.exports = {
    name: "songAdd",
    execute(queue, song) {
        queue.data?.msgChannel?.send(`**${song.name}** has been added to the queue.\n${song.url}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy.tag}]: ${song} ${song.url}`);
    }
}