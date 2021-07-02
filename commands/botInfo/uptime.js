module.exports = {
    name: "uptime",
    description: "Display bot's uptime.",
    args: false,
    execute(message, args, client) {
        let str = [];
        let duration = client.uptime;

        const msInDay = 1000 * 60 * 60 * 24;
        const days = Math.trunc(duration / msInDay);
        if (days > 0) {
            str.push(days + "d");
            duration = duration - (days * msInDay);
        }

        const msInHour = 1000 * 60 * 60;
        const hours = Math.trunc(duration / msInHour);
        if (hours > 0) {
            str.push(hours + 'h');
            duration = duration - (hours * msInHour);
        }

        const msInMinute = 1000 * 60;
        const minutes = Math.trunc(duration / msInMinute);
        if (minutes > 0) {
            str.push(minutes + 'm');
            duration = duration - (minutes * msInMinute);
        }

        const seconds = Math.trunc(duration / 1000);
        if (seconds > 0) {
            str.push(seconds + 's');
        }

        message.channel.send(`${client.user.tag} has been up for ${str.join(" ")}`);
    }
}