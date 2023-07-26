const fs = require('fs');
const express = require("express");
const app = express();
const { join } = require('path');
const path = require("path");
var cors = require('cors');
require('dotenv').config();

app.use(express.static(join(__dirname + '../../public')));
app.set("views", path.join(__dirname + "../../public/views"));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.use(cors())

const api = require("../src/api/controls");

app.get('/api/repositories', api.getRepositories)

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/sitemap.xml", function (req, res) {
    res.sendFile(path.join(__dirname) + "/sitemap.xml");
})

app.listen(3000, function () {
    console.log("Running in 3000 port");
})
