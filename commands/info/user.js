module.exports = {
    name: "user",
    description: "Display user info.",
    args: false,
    execute(message, args) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
}