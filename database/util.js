function createTables(client) {
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

    client.query(statement, (err, res) => {
        if (err) {
            console.error("Error creating tables: ", err.stack);
        }
    });
}

function guildInsert(client, gid, name) {
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
    const values = [gid, name];
    return client.query(statement, values);
}

function songInsert(client, name, url, author) {
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
    return client.query(statement, values);
}

function userInsert(client, username, discriminator, id) {
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
    return client.query(statement, values);
}

function requestInsert(client, gid, sid, uid) {
    // prepare query statement
    const statement = `
        INSERT INTO requests(gid, sid, uid)
            VALUES($1, $2, $3);
    `;

    // insert request into database
    const values = [gid, sid, uid];
    return client.query(statement, values);
}


module.exports = { createTables, guildInsert, songInsert, userInsert, requestInsert };