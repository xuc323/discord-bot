module.exports = {
    async preparedSongInsert(client, guild, song, user) {
        try {
            const gid = (await guildInsert(client, guild.gid, guild.name)).rows[0].gid;
            const sid = (await songInsert(client, song.name, song.url, song.author)).rows[0].sid;
            const uid = (await userInsert(client, user.username, user.discriminator, user.id)).rows[0].uid;
            await requestInsert(client, gid, sid, uid);
        } catch (err) {
            console.log(err.stack);
        }
    }
}

function guildInsert(client, gid, name) {
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
    return client.postgres.query(statement, values);
}

function songInsert(client, name, url, author) {
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
    return client.postgres.query(statement, values);
}

function userInsert(client, username, discriminator, id) {
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
    return client.postgres.query(statement, values);
}

function requestInsert(client, gid, sid, uid) {
    const statement = `INSERT INTO requests(gid, sid, uid) VALUES($1, $2, $3);`;
    const values = [gid, sid, uid];
    return client.postgres.query(statement, values);
}