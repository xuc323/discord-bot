module.exports = {
    name: "clientDisconnect",
    execute(queue) {
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: I was kicked from the Voice Channel, queue ended.`);
    }
}