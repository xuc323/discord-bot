module.exports = {
    name: "hello",
    description: "Hello!",
    args: false,
    aliases: ["hi"],
    execute(message, args, client) {
        message.channel.send("Hi!");
    }
}