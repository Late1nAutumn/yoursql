const db = require("../db");
// const dbInfo = require("../db/info");

module.exports = {
  adminGet: (req, res) => {
    db.query(`SHOW TABLES`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else res.status(200).send(result);
    });
  },
  adminPost: (req, res) => {
    var str = Object.keys(req.body)[0];
    db.query(str, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else res.status(200).send(result);
    });
  },
  login: (req, res) => {
    console.log(req.params.user);
    db.query(
      `CREATE TABLE IF NOT EXISTS ${req.params.user}(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, prop1 TEXT, prop2 INTEGER, prop3 FLOAT, prop4 TEXT);`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else res.status(200).send(result);
      }
    );
  },
  getTable: (req, res) => {
    db.query(`SELECT * FROM ${req.params.user};`, (err, result) => {
      if (err) res.status(200).send(err);
      else res.status(200).send(result);
    });
  },
  query: (req, res) => {
    var str = Object.keys(req.body)[0]
      .trim()
      .toLowerCase();
    if (str.includes("create") || str.includes("show") || str.includes("drop"))
      res.status(400).send("forbidden commands detected");
    else
      db.query(str, (err, result) => {
        if (err) res.status(200).send(err);
        else res.status(200).send(result);
      });
  }
};
