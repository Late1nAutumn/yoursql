const mysql = require("mysql");

const info = require("./info");
var db = mysql.createConnection(info);

db.connect(err => {
  if (err) throw err;
  else console.log("db is running");
});

module.exports = db;
