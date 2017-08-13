"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var mySchema = new Schema(
    {"clicks": Number},
    {"versionKey": false}
);

module.exports = mongoose.model("Click", mySchema);
