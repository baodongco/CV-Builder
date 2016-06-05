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

    passport.use(new GoogleStrategy({
            clientID: dbSettings['clientID'],
            clientSecret: dbSettings['clientSecret'],
            callbackURL: dbSettings['callBackUrl']
        },
        function(accessToken, refreshToken, profile, done) {
            var user = {id: profile.id, username: 'dienbui', email: 'dienbui11@gmail.com'}
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            // });
        }
    ));

    passport.serializeUser(function(user, done) {
        auth.serializeUser(user, done);
    });

    passport.deserializeUser(function(id, done) {
        auth.deserializeUser(id, done);
    });
};