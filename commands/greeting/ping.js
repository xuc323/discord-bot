module.exports = {
    name: "ping",
    description: "Ping!",
    args: false,
    execute(message, args) {
        message.reply("pong!");
    }
}