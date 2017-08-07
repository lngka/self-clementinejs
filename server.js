'use strict';
const express = require("express"),
        routes = require("./app/routes/index.js");
const app = express();
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/self-clementinejs", function (err, db) {
    if (err) throw err;
    else console.log("Successfully connected to database");

    app.use("/public", express.static(process.cwd() + "/public"));
    app.use("/controllers", express.static(process.cwd() + "/controllers"));
    routes(app, db);

    // 3000 is the default PORT
    app.listen(3000, function(){
        console.log("App listens on PORT 3000");
    });
});
