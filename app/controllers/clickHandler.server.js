"use strict";

function clickHandler() {
    const User = require("../models/users.js");

    // get the number of clicks from database
    this.getClicks = function(req, res) {
        User.findOne({"github.id": req.user.github.id}, {"_id": false}).exec(function(err, result) {
            if (err) throw err;

            if (result) res.json(result.nbrClicks);
        });
    };

    // increase number of click by 1, save it in DB
    this.addCLick = function(req, res) {
        User.findOneAndUpdate({"github.id": req.user.github.id}, {$inc: {"nbrClicks.clicks": 1}}, {"new": true})
            .exec(function(err, doc) {
                if (err) throw err;
                res.json(doc.nbrClicks);
            });
    };

    // reset the number of clicks to 0 in DB
    this.resetClicks = function(req, res) {
        User.findOneAndUpdate({"github.id": req.user.github.id}, {"nbrClicks.clicks": 0}, {"new": true})
            .exec(function(err, doc) {
                if (err) throw err;
                else res.json(doc.nbrClicks);
            });
    };
}
module.exports = clickHandler;
