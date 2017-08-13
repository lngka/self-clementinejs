"use strict";

const GitHubStrategy = require("passport-github").Strategy;
const User           = require("../models/users");
const configAuth     = require("./auth.js");

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GitHubStrategy({
        "clientID"    : configAuth.githubAuth.clientID,
        "clientSecret": configAuth.githubAuth.clientSecret,
        "callbackURL" : configAuth.githubAuth.callbackURL
    }, function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({"github.id": profile.id}, function(err, user) {
                if (err) return done(err, null);

                if (user) return done(null, user);

                else {
                    var newUser = new User();
                    newUser.github.id          = profile.id;
                    newUser.github.displayName = profile.displayName;
                    newUser.github.username    = profile.username;
                    newUser.github.publicRepos = profile._json.public_repos;
                    newUser.nbrClicks.clicks   = 0;
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
