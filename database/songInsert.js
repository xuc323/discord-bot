module.exports = {
    async preparedSongInsert(client, guild, song, user) {
        let uid, sid;
        try {
            uid = (await guildInsert(client, guild.uid, guild.name)).rows[0].uid;
            sid = (await songInsert(client, song.name, song.url)).rows[0].sid;
        } catch (err) {
            console.log(err.stack);
        }
        requestInsert(client, user, uid, sid);
    }
}

function guildInsert(client, gid, name) {
    const statement = `INSERT INTO guilds(guildId, name) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING uid;`;
    const values = [gid, name];
    return client.postgres.query(statement, values);
}

function songInsert(client, name, url) {
    const statement = `INSERT INTO songs(name, url) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING sid;`;
    const values = [name, url];
    return client.postgres.query(statement, values);
}

function requestInsert(client, userId, uid, sid) {
    const statement = `INSERT INTO requests(uid, sid, userId) VALUES($1, $2, $3);`;
    const values = [uid, sid, userId];
    client.postgres.query(statement, values, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            // console.log(res);
        }
    });
}