const app = require("express")();
const path = require("path");
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});