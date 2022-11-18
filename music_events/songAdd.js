const { preparedSongInsert } = require("../database/songInsert");

module.exports = {
    name: "songAdd",
    execute(queue, song, client) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send(`**${song.name}** has been added to the queue.\n${song.url}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy}]: ${song} ${song.url}`);

        preparedSongInsert(client, { uid: queue.guild.id, name: queue.guild.name }, { name: song.name, url: song.url }, song.requestedBy);
    }
}