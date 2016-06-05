var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var config = require('config');

var dbSettings = config.get('cv-builder.googleAuth');
var auth = require('../controllers/auth-controller');

module.exports = function (passport) {
    // Login handler
    passport.use('local-login', new LocalStrategy({
            usernameField : 'username', passwordField : 'password', passReqToCallback : true
        }, function(req, username, password, done) {
            auth.postLogin(req, done);
        })
    );

    passport.serializeUser(function(user, done) {
        auth.serializeUser(user, done);
    });

    passport.deserializeUser(function(id, done) {
        auth.deserializeUser(id, done);
    });
};