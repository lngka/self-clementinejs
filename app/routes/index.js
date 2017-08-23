"use strict";
const ClickHandler = require(process.cwd() + "/app/controllers/clickHandler.server.js");

module.exports = function(app) {
    var clickHandler = new ClickHandler();

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/login");
        }
    }

    app.route("/")
        .get(isLoggedIn, function(req, res) {
            res.sendFile(process.cwd()  + "/public/index.html");
        });

    app.route("/login")
        .get(function(req, res) {
            res.sendFile(process.cwd()  + "/public/login.html");
        });
    app.route("/logout")
        .get(function(req, res) {
            req.logout();
            res.redirect("/login");
        });

    app.route("/api/clicks")
        .get(clickHandler.getClicks)
        .post(clickHandler.addCLick)
        .delete(clickHandler.resetClicks);

};
