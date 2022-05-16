const { Client } = require('pg');
const { createTables, guildInsert, songInsert, userInsert, requestInsert } = require('./util');

// database class
class Database {
    constructor(url) {
        // create an instance of the database client
        this.client = new Client({
            connectionString: url,
            ssl: {
                rejectUnauthorized: false
            }
        });

        // create a connection to the database
        this.client.connect((err) => {
            if (err) {
                console.error("Connection error: ", err.stack);
            } else {
                console.log("Postgres database connected!");
                // after connection, create table if not exists
                createTables(this.client);
            }
        });

        // listen for error event
        this.client.on("error", (err) => {
            console.error("ERROR: ", err.stack);
        });

        // listen for end event
        this.client.on("end", () => {
            console.log("Database connection ended.");
        });
    }

    /**
     * When a song is requested, insert guild, song
     * and user into into database. Each insertion returns
     * a promise that resolves into unique id, and it's necessary
     * for the request table.
     * @param {Object} guild 
     * @param {BigInt} guild.id the guild id from discord
     * @param {String} guild.name the guild name from discord
     * @param {Object} song
     * @param {String} song.name the song name from youtube
     * @param {String} song.url the song url from youtube
     * @param {String} song.author the song author from youtube
     * @param {Object} user
     * @param {String} user.username the user name from discord
     * @param {String} user.discriminator the user discriminator from discord
     * @param {BigInt} user.id the user id from discord
     */
    playSongInsert(guild, song, user) {
        const gid_promise = guildInsert(this.client, guild.gid, guild.name);
        const sid_promise = songInsert(this.client, song.name, song.url, song.author);
        const uid_promise = userInsert(this.client, user.username, user.discriminator, user.id);
        Promise.all([gid_promise, sid_promise, uid_promise]).then((values) => {
            const gid = values[0].rows[0].gid;
            const sid = values[1].rows[0].sid;
            const uid = values[2].rows[0].uid;
            requestInsert(this.client, gid, sid, uid);
        }).catch(err => console.error(err));
    }
}

module.exports = Database;