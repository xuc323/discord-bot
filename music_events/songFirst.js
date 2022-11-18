module.exports = {
    name: "songFirst",
    execute(queue, song) {
        console.log(`Started playing ${song}.`);
    }
}