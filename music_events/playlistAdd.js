module.exports = {
    name: "playlistAdd",
    execute(queue, playlist) {
        queue.data?.msgChannel?.send(`**${playlist.name}** has been added to the queue.\n${playlist.url}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${playlist.songs[0].requestedBy.tag}]: ${playlist} ${playlist.url}`);
    }
}