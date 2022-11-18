const { Client } = require('pg');

// database class
class Database {
    constructor(url) {
        // create an instance of the database client
        this.client = new Client({ connectionString: url });

        // create a connection to the database
        this.client.connect((err) => {
            if (err) {
                console.error("Connection error: ", err.stack);
            } else {
                console.log("Postgres database connected!");
                // after connection, create table if not exists
                this.#createTables();
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
     * helper function to create all necessary tables
     */
    #createTables() {
        // query statement to create relational table if not exists
        const statement = `
            CREATE TABLE IF NOT EXISTS guilds(
                gid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                id BIGINT UNIQUE NOT NULL,
                name TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS songs(
                sid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                name TEXT NOT NULL,
                url TEXT UNIQUE NOT NULL,
                author TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS users(
                uid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                username TEXT NOT NULL,
                discriminator VARCHAR(8) NOT NULL,
                id BIGINT UNIQUE NOT NULL
            );
            CREATE TABLE IF NOT EXISTS requests(
                gid uuid NOT NULL REFERENCES guilds (gid),
                sid uuid NOT NULL REFERENCES songs (sid),
                uid uuid NOT NULL REFERENCES users (uid),
                date TIMESTAMP DEFAULT now()
            );
        `;

        this.client.query(statement, (err, res) => {
            if (err) {
                console.error("Error creating tables: ", err.stack);
            }
        });
    }

    /**
     * When a song is requested, insert guild, song
     * and user into into database. Each insertion returns
     * a promise that resolves into unique id, and it's necessary
     * for the request table.
     * @param {object} guild 
     * @param {bigint} guild.id the guild id from discord
     * @param {string} guild.name the guild name from discord
     * @param {object} song
     * @param {string} song.name the song name from youtube
     * @param {string} song.url the song url from youtube
     * @param {string} song.author the song author from youtube
     * @param {object} user
     * @param {string} user.username the user name from discord
     * @param {string} user.discriminator the user discriminator from discord
     * @param {bigint} user.id the user id from discord
     */
    playSongInsert(guild, song, user) {
        const gid_promise = this.#guildInsert(guild.id, guild.name);
        const sid_promise = this.#songInsert(song.name, song.url, song.author);
        const uid_promise = this.#userInsert(user.username, user.discriminator, user.id);
        Promise.all([gid_promise, sid_promise, uid_promise]).then((values) => {
            const gid = values[0].rows[0].gid;
            const sid = values[1].rows[0].sid;
            const uid = values[2].rows[0].uid;
            this.#requestInsert(gid, sid, uid);
        }).catch(err => console.error(err));
    }

    /**
     * helper function to insert guild information into database
     * @param {bigint} id 
     * @param {string} name 
     * @returns 
     */
    #guildInsert(id, name) {
        // prepare query statement
        const statement = `
            INSERT INTO guilds(id, name)
                VALUES($1, $2)
            ON CONFLICT (id) 
            DO 
                UPDATE SET name=$2
            RETURNING gid;
        `;

        // insert guild into database
        const values = [id, name];
        return this.client.query(statement, values);
    }

    /**
     * 
     * @param {string} name 
     * @param {URL} url 
     * @param {string} author 
     * @returns 
     */
    #songInsert(name, url, author) {
        // prepare query statement
        const statement = `
            INSERT INTO songs(name, url, author)
                VALUES($1, $2, $3)
            ON CONFLICT (url) 
            DO 
                UPDATE SET name=$1, author=$3
            RETURNING sid;
        `;

        // insert song into database
        const values = [name, url, author];
        return this.client.query(statement, values);
    }

    /**
     * 
     * @param {string} username 
     * @param {number} discriminator 
     * @param {bigint} id 
     * @returns 
     */
    #userInsert(username, discriminator, id) {
        // prepare query statement
        const statement = `
            INSERT INTO users(username, discriminator, id)
                VALUES($1, $2, $3)
            ON CONFLICT (id) 
            DO 
                UPDATE SET username=$1, discriminator=$2
            RETURNING uid;
        `;

        // insert user into database
        const values = [username, discriminator, id];
        return this.client.query(statement, values);
    }

    /**
     * 
     * @param {uuid} gid 
     * @param {uuid} sid 
     * @param {uuid} uid 
     * @returns 
     */
    #requestInsert(gid, sid, uid) {
        // prepare query statement
        const statement = `
            INSERT INTO requests(gid, sid, uid)
                VALUES($1, $2, $3);
        `;

        // insert request into database
        const values = [gid, sid, uid];
        return this.client.query(statement, values);
    }

    getRecentSongs(gid, limit) {
        // prepare query statement
        const statement = `
            WITH request AS (
                SELECT requests.date, songs.name, songs.url, songs.author, users.id, guilds.id AS guild_id
                    FROM requests
                    LEFT JOIN songs ON requests.sid = songs.sid
                    LEFT JOIN users ON requests.uid = users.uid
                    LEFT JOIN guilds ON requests.gid = guilds.gid
                    ORDER BY requests.date DESC
            )
            SELECT * FROM request
                WHERE request.guild_id = $1
                LIMIT $2;
        `;

        // insert request into database
        const values = [gid, limit];
        return this.client.query(statement, values);
    }
}

module.exports = Database;