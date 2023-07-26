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

const api = require("../src/api/controls");

var corsOptions = {
    origin: 'https://www.willgonzaga.tech',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/api/repositories', cors(corsOptions), api.getRepositories)

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/sitemap.xml", function (req, res) {
    res.sendFile(path.join(__dirname) + "/sitemap.xml");
})

app.listen(3000, function () {
    console.log("Running in 3000 port");
})
