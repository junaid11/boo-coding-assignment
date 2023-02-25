"use strict";
require("dotenv").config();

const express = require("express");
const { openDbConnection } = require("./db");
const profileRouter = require("./routes/profile/profile");
const commentRouter = require('./routes/comment/comment');
const likeRouter = require("./routes/like/like");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// set the view engine to ejs
app.set("view engine", "ejs");

openDbConnection();

// routes
app.use("/", profileRouter());
app.use('/comment', likeRouter());
app.use('/comments', commentRouter());

// start server
const appServer = app.listen(port);
console.log(`listening on ${port}`);
module.exports = appServer;
