'use strict';

function clickHandler(db) {

    var collection = db.collection("clicks");

    // get the number of clicks from database
    this.getClicks = function(req, res) {
        var butNoIDplease = {"_id": false};

        collection.findOne({}, butNoIDplease, function(err, result) {
            if (err) throw err;

            if (result) res.json(result);
            // a new document is generated to store number of clicks, incase it's not already there
            collection.insert({"clicks": 0}, function(err) {
                if (err) throw err;
                res.json({"clicks": 0});
            });
        });
    };

    // increase number of click by 1, save it in DB
    this.addCLick = function(req, res) {
        collection.findAndModify({}, //query
                                 {"_id": 1}, // sort ascending by id
                                 {$inc: {"clicks": 1}}, // operator, https://docs.mongodb.com/manual/reference/operator/update/
                                 {"new": true}, // options, the updated doc will be passed to the callback
                                 function(err, doc) {
                                     if (err) throw err;
                                     else res.json(doc);
                                 });
    }

    // reset the number of clicks to 0 in DB
    this.resetClicks = function(req, res) {
        collection.updateOne({},
                             {"clicks": 0},
                             function(err, result) {
                                 if (err) throw err;
                                 else res.json(result);
                             }
        )
    }
}
module.exports = clickHandler;
