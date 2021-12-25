const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Display the server queue",
    aliases: ["q"],
    args: false,
    execute(message, args, client, guildQueue) {
        const emb = new MessageEmbed().setTitle("Queue");
        if (guildQueue) {
            for (let i = 0; i < guildQueue.songs.length; i++) {
                const song = guildQueue.songs[i];
                if (i === 0) {
                    emb.addField("Now Playing", `${song.name}\n${song.author}\nRequested by: ${song.requestedBy}`);
                } else {
                    emb.addField(`#${i + 1}`, `${song.name}\n${song.author}\nRequested by: ${song.requestedBy}`);
                }
            }
            emb.setFooter(`Count: ${guildQueue.songs.length}`);
        } else {
            emb.setFooter("Queue is empty.")
        }
        message.channel.send({ embeds: [emb] });
    }
}