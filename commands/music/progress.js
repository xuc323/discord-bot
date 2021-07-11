module.exports = {
    name: "progress",
    description: "Create a progress bar for the current song.",
    aliases: ["prog"],
    args: false,
    execute(message, args, client) {
        const bar = client.player.createProgressBar(message, {
            size: 15,
            block: "=",
            arrow: ">"
        });
        if (bar) {
            message.channel.send(bar);
        }
    }
}