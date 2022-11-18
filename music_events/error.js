module.exports = {
    name: "error",
    execute(error, message) {
        console.log("ERROR: ", error);
        message.channel.send(`ERROR: ${error}`);
    }
}