const { Player } = require("discord-music-player");
const { readdirSync } = require("fs");

module.exports = {
    Player(client) {
        // get an instance of music player
        const player = new Player(client);

        // register music events
        const eventFiles = readdirSync("./music_player/events").filter((file) => file.endsWith(".js"));
        for (const file of eventFiles) {
            const event = require(`./events/${file}`);
            player.on(event.name, (...args) => event.execute(...args));
        }

        return player;
    }
}