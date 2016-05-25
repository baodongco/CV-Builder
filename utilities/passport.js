var LocalStrategy   = require('passport-local').Strategy;

var auth = require('../controllers/auth-controller');

module.exports = function (passport) {
    // Sign up handler.
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'username', passwordField : 'password', passReqToCallback : true
        }, function(req, username, password, done) {
            auth.postRegister(req, username, password, done);
        })
    );

    // Login handler
    passport.use('local-login', new LocalStrategy({
            usernameField : 'username', passwordField : 'password', passReqToCallback : true
        }, function(req, username, password, done) {
            auth.postLogin(req, username, password, done);
        })
    );

    passport.serializeUser(function(user, done) {
        auth.serializeUser(user, done);
    });

    passport.deserializeUser(function(id, done) {
        auth.deserializeUser(id, done);
    });
};