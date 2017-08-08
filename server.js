'use strict';

const express  = require('express');
const path     = require('path');
const routes   = require('./app/routes/routes.js');
const mongoose = require('mongoose');

const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

mongoose.connect('mongodb://localhost:27017/clementinejs');

app.use(allowCrossDomain);
app.use('/public', express.static(path.join(process.cwd(), '/public')));
app.use('/app/controllers', express.static(path.join(process.cwd(), '/app/controllers')));
routes(app);

// 3000 is the default PORT
app.listen(3000, () => {
    console.log('App listens on PORT 3000');
});
