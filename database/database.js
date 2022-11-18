const { Client } = require('pg');

class Database {
    constructor(config) {
        // create an instance of the database client
        this.client = new Client({
            connectionString: config,
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
                        discriminator VARCHAR(10) NOT NULL,
                        id BIGINT UNIQUE NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS requests(
                        gid uuid NOT NULL REFERENCES guilds (gid),
                        sid uuid NOT NULL REFERENCES songs (sid),
                        uid uuid NOT NULL REFERENCES users (uid),
                        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                `;

                this.client.query(statement, (err, res) => {
                    if (err) {
                        console.error("Error creating tables: ", err.stack);
                    } else {
                        console.log("Tables created!");
                    }
                });
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

    guildInsert(gid, name) {
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
        return this.client.query(statement, [gid, name]);
    }

    songInsert(name, url, author) {
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
        return this.client.query(statement, [name, url, author]);
    }

    userInsert(username, discriminator, id) {
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
        return this.client.query(statement, [username, discriminator, id]);
    }

    requestInsert(gid, sid, uid) {
        // prepare query statement
        const statement = `
            INSERT INTO requests(gid, sid, uid)
                VALUES($1, $2, $3);
        `;

        // insert request into database
        return this.client.query(statement, [gid, sid, uid]);
    }

}

module.exports = Database;