module.exports = {
    async preparedSongInsert(client, guild, song, user) {
        let uid, sid;
        try {
            uid = (await guildInsert(client, guild.uid, guild.name)).rows[0].uid;
            sid = (await songInsert(client, song.name, song.url)).rows[0].sid;
            await requestInsert(client, user, uid, sid);
        } catch (err) {
            console.log(err.stack);
        }
    }
}

function guildInsert(client, gid, name) {
    const statement = `
        WITH e AS(
            INSERT INTO guilds (guildId, name) 
                VALUES ($1, $2)
            ON CONFLICT (guildId) DO NOTHING
            RETURNING uid
        )
        SELECT * FROM e
        UNION
            SELECT uid FROM guilds WHERE guildId=$1;
        `;
    const values = [gid, name];
    return client.postgres.query(statement, values);
}

function songInsert(client, name, url) {
    const statement = `
        WITH e AS(
            INSERT INTO songs (name, url) 
                VALUES ($1, $2)
            ON CONFLICT (url) DO NOTHING
            RETURNING sid
        )
        SELECT * FROM e
        UNION
            SELECT sid FROM songs WHERE url=$2;
        `;
    const values = [name, url];
    return client.postgres.query(statement, values);
}

function requestInsert(client, userId, uid, sid) {
    const statement = `INSERT INTO requests(uid, sid, userId) VALUES($1, $2, $3);`;
    const values = [uid, sid, userId];
    return client.postgres.query(statement, values);
}