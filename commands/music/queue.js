const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Display the server queue",
    args: false,
    execute(message, args, client) {
        const queue = client.player.getQueue(message);
        const emb = new MessageEmbed().setTitle("Queue");
        if (queue) {
            for (let i = 0; i < queue.songs.length; i++) {
                const song = queue.songs[i];
                if (i === 0) {
                    emb.addField("Now Playing", `${song.name}\n${song.author}\nRequested by: ${song.requestedBy}`);
                } else {
                    emb.addField(`#${i + 1}`, `${song.name}\n${song.author}\nRequested by: ${song.requestedBy}`);
                }
            }
            emb.setFooter(`Count: ${queue.songs.length}`);
        } else {
            emb.setFooter("Queue is empty.")
        }
        message.channel.send(emb);
    }
}