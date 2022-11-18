module.exports = {
    name: "user-info",
    description: "Display user info",
    execute(message, args) {
        message.reply(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
}