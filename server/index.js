const express = require("express");
const bParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3000;

const router = require("./router");

const app = express();
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.listen(port, () => {
  console.log("server online:" + port);
});

app.get("/server/test", (req, res) => {
  console.log("visited");
  res.status(200).send(":" + port + " is watching you");
});

app.use("/", router);