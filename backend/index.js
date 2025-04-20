const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "email1926",
  database: "routegenie"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

app.get("/", (req, res) => {
  res.send("RouteGenie Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
