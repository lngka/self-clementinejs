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

// init environment variables
dotenv.load();

// see http://mongoosejs.com/docs/connections.html#use-mongo-client
mongoose.connect(process.env.MONGO_URI, {"useMongoClient": true});

// init app
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
app.use("/app/common", express.static(path.join(process.cwd(), "/app/common")));

routes(app, passport);

// 3000 is the default PORT
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App listens on port: " + port);
});
