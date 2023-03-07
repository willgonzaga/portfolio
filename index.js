const fs = require('fs');
const express = require("express");
const app = express();
const { join } = require('path');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');
const url = process.env.linkDB;
const client = new MongoClient(url);
const dbName = 'Portfolio';

app.use(express.static(join(__dirname + '/public')));
app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    async function main() {
            
        await client.connect();
        console.log('Acessando banco de dados...');
        const db = client.db(dbName);
        const collection = db.collection('Projetos');

        var dbArray = await collection.find({}).toArray();
        var cont = 0;
        projetos = new Array();
        while(cont<dbArray.length) {
            var obj = {
                "id": dbArray[cont].id,
                "projname": dbArray[cont].projname,
                "projdesc": dbArray[cont].projdesc,
                "projimg": dbArray[cont].projimg,
                "link": dbArray[cont].link,
                "repositorio": dbArray[cont].repositorio,
                "linguagens": dbArray[cont].linguagens
            }
            projetos.unshift(obj);
            cont++;
        }

        res.render("index", {projetos: projetos});
        return 'Saindo do banco de dados...';
    }

    main()
		.then(console.log)
		.catch(console.error)
		.finally(() => client.close());
res.render("index", {projetos: projetos});
})

app.get("/projects/", function (req, res) {
    var projid = req.query.id;
    async function main() {
            
        await client.connect();
        console.log('Acessando banco de dados...');
        const db = client.db(dbName);
        const collection = db.collection('Projetos');

        var dbArray = await collection.find({id: projid}).toArray();

        var obj = {
            "id": dbArray[0].id,
            "projname": dbArray[0].projname,
            "projdesc": dbArray[0].projdesc,
            "projimg": dbArray[0].projimg,
            "link": dbArray[0].link,
            "repositorio": dbArray[0].repositorio,
            "linguagens": dbArray[0].linguagens
        }

        res.render("projects", {projeto: obj});

        return 'Saindo do banco de dados...';
    }

    main()
		.then(console.log)
		.catch(console.error)
		.finally(() => client.close());
})

app.get("/sitemap.xml", function (req, res) {
    res.sendFile(path.join(__dirname) + "/sitemap.xml");
})

app.listen(3000, function() {
    console.log("http://localhost:3000");
})
