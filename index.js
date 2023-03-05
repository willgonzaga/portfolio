const fs = require('fs');
const express = require("express");
const app = express();
const { join } = require('path');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment-timezone')

app.use(express.static(join(__dirname + '/public')));
app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/sitemap.xml", function (req, res) {
    res.sendFile(path.join(__dirname) + "/sitemap.xml");
})

app.listen(3000, function() {
    console.log("http://localhost:3000");
})