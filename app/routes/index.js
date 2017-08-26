"use strict";
const ClickHandler = require(process.cwd() + "/app/controllers/clickHandler.server.js");

module.exports = function(app, passport) {
    var clickHandler = new ClickHandler();

    function ensureAuthenticated (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/login");
        }
    }

    app.route("/")
        .get(ensureAuthenticated, function(req, res) {
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

    app.route("/profile")
        .get(ensureAuthenticated, function(req, res) {
            res.sendFile(process.cwd() + "/public/profile.html");
        });

    app.route("/api/:id")
        .get(ensureAuthenticated, function(req, res) {
            res.json(req.user.github);
        });

    app.route("/auth/github")
        .get(passport.authenticate("github"));

    app.route("/auth/github/callback")
        .get(passport.authenticate("github", {
            successRedirect: "/",
            failureRedirect: "/login"
        }));

    app.route("/api/:id/clicks")
        .get(ensureAuthenticated, clickHandler.getClicks)
        .post(ensureAuthenticated, clickHandler.addCLick)
        .delete(ensureAuthenticated, clickHandler.resetClicks);

};
