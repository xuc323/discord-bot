module.exports = {
    name: "error",
    execute(error, client) {
        console.log(`BOT ERROR: ${error.stack}`);
    }
}