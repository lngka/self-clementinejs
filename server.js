"use strict";

// requirements
const express          = require("express");
const path             = require("path");
const routes           = require("./app/routes/index.js");
const mongoose         = require("mongoose");
const passport         = require("passport");
const session          = require("express-session");
const dotenv = require("dotenv");
const allowCrossDomain = require("./app/common/allowCrossDomain.js");

// see http://mongoosejs.com/docs/connections.html#use-mongo-client
mongoose.connect("mongodb://localhost:27017/clementinejs", {"useMongoClient": true});

// init app
dotenv.load();
const app = express();

app.use(session({
    "secret": "somePasswordForSession1337!!",
    "resave": false,
    "saveUninitialized": true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(allowCrossDomain);
app.use("/public", express.static(path.join(process.cwd(), "/public")));
app.use("/app/controllers", express.static(path.join(process.cwd(), "/app/controllers")));

routes(app, passport);

// 3000 is the default PORT
app.listen(8080, () => {
    console.log("App listens on PORT 8080");
});
