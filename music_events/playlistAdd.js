module.exports = {
    name: "playlistAdd",
    execute(queue, playlist, client) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send(`**${playlist.name}** has been added to the queue.\n${playlist.url}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${playlist.songs[0].requestedBy.tag}]: ${playlist} ${playlist.url}`);
        for (let i = 0; i < playlist.songs.length; i++) {
            const song = playlist.songs[i];
            client.database.playSongInsert({ gid: queue.guild.id, name: queue.guild.name }, { name: song.name, url: song.url, author: song.author }, { username: song.requestedBy.username, discriminator: song.requestedBy.discriminator, id: song.requestedBy.id });
        }
    }
}