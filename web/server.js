const express = require("express");

module.exports = {
    server() {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        app.use("/", (req, res) => {
            res.sendFile(__dirname + "/index.html");
        });

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Web page is running at port http://localhost:${port}`);
        });
    }
}