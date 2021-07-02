module.exports = {
    name: "hello",
    description: "Hello!",
    args: false,
    aliases: ["hi"],
    execute(message, args) {
        message.channel.send("Hi!");
    }
}