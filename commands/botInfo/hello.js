module.exports = {
    name: "hello",
    description: "Hello!",
    args: false,
    aliases: ["hi"],
    category: "greeting",
    execute(message, args, client) {
        message.channel.send(`Hi, ${message.author.username}!`);
    }
}