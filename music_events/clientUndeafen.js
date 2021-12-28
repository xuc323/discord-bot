module.exports = {
    name: "clientUndeafen",
    execute(queue) {
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: I got undefeanded.`);
    }
}