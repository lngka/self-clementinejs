'use strict';

const express     = require('express');
const path        = require('path');
const routes      = require('./app/routes/index.js');
const MongoClient = require('mongodb').MongoClient;

const app = express();

MongoClient.connect('mongodb://localhost:27017/self-clementinejs', (err, db) => {
  if (err) throw err;

  app.use('/public', express.static(path.join(process.cwd(), '/public')));
  app.use('/controllers', express.static(path.join(process.cwd(), '/controllers')));
  routes(app, db);

  // 3000 is the default PORT
  app.listen(3000, () => {
    console.log('App listens on PORT 3000');
  });
});
