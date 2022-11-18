# Discord Welcome Bot

[Add **Discord Welcome Bot** to your Discord server][0]

# Requirements

- git
- npm

# Usage

After clone the repo to your local machine, perform the following command to install the required dependencies:

```bash
$ npm install
```

After installing the required dependencies, run the following command to start the bot:

```bash
$ npm start
```

Or you can run the following command to start the bot with nodemon, so the bot will be automatically restarted once changes are detected:

```bash
$ npm test
```

# Environment Variables

### Discord Application Token

Obtain the Discord application token from the [Discord developer portal][2].

Once the token is obtained, create a `.env` file to store the configurations. Remember to not leak those. Prefix is a special function call so the bot will not response to every single messages. You can choose any prefix as you wish.

```bash
# .env
DISCORD_TOKEN=YOUR_TOKEN
PREFIX=!
```

# Packages

[discord-music-player][1]

[0]: https://discord.com/api/oauth2/authorize?client_id=853751983683928114&permissions=8&scope=bot
[1]: https://www.npmjs.com/package/discord-music-player
[2]: https://discord.com/developers/applications
