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
            var id = req.params.id;
            if (id == req.user.github.id) {
                res.json(req.user);
            } else {
                res.send("Use your own Github ID");
            }
        });

    app.route("/auth/github")
        .get(passport.authenticate("github"));

    app.route("/api/clicks")
        .use(ensureAuthenticated)
        .get(clickHandler.getClicks)
        .post(clickHandler.addCLick)
        .delete(clickHandler.resetClicks);

};
