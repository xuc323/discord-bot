module.exports = {
    name: "songAdd",
    execute(queue, song) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send(`**${song.name}** has been added to the queue.\n${song.url}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id} | ${song.requestedBy}]: Song ${song} was added to the queue.`);
    }
}