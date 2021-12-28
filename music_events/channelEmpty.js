module.exports = {
    name: "channelEmpty",
    execute(queue) {
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: Everyone left the Voice Channel, queue ended.`);
    }
}