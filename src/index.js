const express = require("express");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const route = require("./routes");
const db = require("./config/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// connect to db
db.connect(process.env.db_url);

// route init
route(app);

// run server
const port = process.env.port || 8888;
if (!module.parent) {
  app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
  });
}

module.exports = app;
