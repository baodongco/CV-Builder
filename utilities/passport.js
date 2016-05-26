var LocalStrategy   = require('passport-local').Strategy;

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