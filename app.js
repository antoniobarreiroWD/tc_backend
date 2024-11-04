require("dotenv").config();

require("./db");

const express = require("express");

const app = express();


const config = require('./config');
config(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

require("./error")(app);

module.exports = app;