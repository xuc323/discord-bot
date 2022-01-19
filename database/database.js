const { Client } = require("pg");

const statement = `
    DROP TABLE guilds, songs, requests;
    CREATE TABLE IF NOT EXISTS guilds(
        uid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        guildId BIGINT UNIQUE NOT NULL,
        name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS songs(
        sid uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS requests(
        uid uuid NOT NULL REFERENCES guilds (uid),
        sid uuid NOT NULL REFERENCES songs (sid),
        userId TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

module.exports = {
    // initialize connection with postgres database
    sql(url) {
        const client = new Client({
            connectionString: url,
            ssl: {
                rejectUnauthorized: false
            }
        });

        client.connect((err) => {
            if (err) {
                console.error("Connection error", err.stack);
            } else {
                console.log("Postgres database connected!");
            }
        });

        client.on("error", (err) => {
            console.err("ERROR:", err.stack);
        });

        client.on("end", () => {
            console.log("Database connection ended.");
        });

        // client.query(statement, (err, res) => {
        //     if (err) {
        //         console.log(err.stack);
        //     } else {
        //         // console.log(res);
        //     }
        // });

        return client;
    }
}