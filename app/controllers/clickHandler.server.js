"use strict";

function clickHandler() {
    const Clicks = require("../models/clicks.js");

    // get the number of clicks from database
    this.getClicks = function(req, res) {
        Clicks.findOne({}, {"_id": false}).exec(function(err, result) {
            if (err) throw err;

            if (result) res.json(result);
            // a new document is generated to store number of clicks, incase it""s not already there
            else {
                var newDoc = new Clicks({"clicks": 0});
                newDoc.save(function(err, doc) {
                    if (err) throw err;
                    res.json(doc);
                });
            }
        });
    };

    // increase number of click by 1, save it in DB
    this.addCLick = function(req, res) {
        Clicks.findOneAndUpdate({}, {$inc: {"clicks": 1}}, {"new": true}).exec(function(err, doc) {
            if (err) throw err;
            res.json(doc);
        });
    };

    // reset the number of clicks to 0 in DB
    this.resetClicks = function(req, res) {
        Clicks.findOneAndUpdate({}, {"clicks": 0}, {"new": true}).exec(function(err, doc) {
            if (err) throw err;
            else res.json(doc);
        });
    };
}
module.exports = clickHandler;
