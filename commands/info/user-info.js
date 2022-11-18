module.exports = {
    name: "user-info",
    description: "Display user info.",
    args: false,
    execute(message, args) {
        message.reply(`\nYour username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
}