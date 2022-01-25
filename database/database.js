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
            console.error("ERROR:", err.stack);
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