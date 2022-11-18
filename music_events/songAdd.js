module.exports = {
    name: "songAdd",
    execute(queue, song, client) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send(`**${song.name}** has been added to the queue.\n${song.url}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy.tag}]: ${song} ${song.url}`);
        client.postgres.playSongInsert(
            { gid: queue.guild.id, name: queue.guild.name },
            { name: song.name, url: song.url, author: song.author },
            { username: song.requestedBy.username, discriminator: song.requestedBy.discriminator, id: song.requestedBy.id }
        );
    }
}