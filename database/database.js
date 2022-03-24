const { Client } = require("pg");

// sql query for testing only
// const statement = `
//     DROP TABLE guilds, songs, requests, users;
//     CREATE TABLE IF NOT EXISTS guilds(
//         gid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//         id BIGINT UNIQUE NOT NULL,
//         name TEXT NOT NULL
//     );
//     CREATE TABLE IF NOT EXISTS songs(
//         sid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//         name TEXT NOT NULL,
//         url TEXT UNIQUE NOT NULL,
//         author TEXT NOT NULL
//     );
//     CREATE TABLE IF NOT EXISTS users(
//         uid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//         username TEXT NOT NULL,
//         discriminator VARCHAR(10) NOT NULL,
//         id BIGINT UNIQUE NOT NULL
//     );
//     CREATE TABLE IF NOT EXISTS requests(
//         gid uuid NOT NULL REFERENCES guilds (gid),
//         sid uuid NOT NULL REFERENCES songs (sid),
//         uid uuid NOT NULL REFERENCES users (uid),
//         date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
// `;

class Database {
    /**
     * Connect to postgres database by passing in URL.
     * @param {String} url 
     */
    constructor(url) {
        this.client = new Client({
            connectionString: url,
            ssl: {
                rejectUnauthorized: false,
            }
        });

        this.client.connect((err) => {
            if (err) {
                console.error("Connection error", err.stack);
            } else {
                console.log("Postgres database connected!");
            }
        });

        this.client.on("error", (err) => {
            console.error("ERROR:", err.stack);
        });

        this.client.on("end", () => {
            console.log("Database connection ended.");
        });
    };

    /**
     * 
     * @param {Object} guild 
     * @param {String} guild.gid
     * @param {String} guild.name
     * @param {Object} song 
     * @param {String} song.name
     * @param {String} song.url
     * @param {String} song.author
     * @param {Object} user 
     * @param {String} user.username
     * @param {String} user.discriminator
     * @param {String} user.id
     */
    playSongInsert(guild, song, user) {
        const gid = this.guildInsert(guild.gid, guild.name);
        const sid = this.songInsert(song.name, song.url, song.author);
        const uid = this.userInsert(user.username, user.discriminator, user.id);
        Promise.all([gid, sid, uid]).then((res) => {
            this.requestInsert(res[0].rows[0].gid, res[1].rows[0].sid, res[2].rows[0].uid).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    /**
     * 
     * @param {BigInteger} gid 
     * @param {String} name 
     * @returns 
     */
    guildInsert(gid, name) {
        const statement = `
        WITH e AS(
            INSERT INTO guilds (id, name) 
                VALUES ($1, $2)
            ON CONFLICT (id) DO NOTHING
            RETURNING gid
        )
        SELECT * FROM e
        UNION
            SELECT gid FROM guilds WHERE id=$1;
        `;
        const values = [gid, name];
        return this.client.query(statement, values);
    }

    /**
     * 
     * @param {String} name 
     * @param {String} url 
     * @param {String} author 
     * @returns 
     */
    songInsert(name, url, author) {
        const statement = `
        WITH e AS(
            INSERT INTO songs (name, url, author) 
                VALUES ($1, $2, $3)
            ON CONFLICT (url) DO NOTHING
            RETURNING sid
        )
        SELECT * FROM e
        UNION
            SELECT sid FROM songs WHERE url=$2;
        `;
        const values = [name, url, author];
        return this.client.query(statement, values);
    }

    /**
     * 
     * @param {String} username 
     * @param {Number} discriminator 
     * @param {BigInteger} id 
     * @returns
     */
    userInsert(username, discriminator, id) {
        const statement = `
        WITH e AS(
            INSERT INTO users (username, discriminator, id) 
                VALUES ($1, $2, $3)
            ON CONFLICT (id) DO NOTHING
            RETURNING uid
        )
        SELECT * FROM e
        UNION
            SELECT uid FROM users WHERE id=$3;
        `;
        const values = [username, discriminator, id];
        return this.client.query(statement, values);
    }

    requestInsert(gid, sid, uid) {
        const statement = `INSERT INTO requests(gid, sid, uid) VALUES($1, $2, $3);`;
        const values = [gid, sid, uid];
        return this.client.query(statement, values);
    }
};

module.exports = Database;