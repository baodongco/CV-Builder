var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var connection = require('../DAL/connection');

module.exports = function (passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.pool.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // Sign up handler.
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'username', passwordField : 'password', passReqToCallback : true
        }, function(req, username, password, done) {
            // Check if username already exists.
            connection.pool.query("SELECT id FROM users WHERE email = ?", req.body.email, function(err, rows) {
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'Email is already taken.'));
                } else {
                    // Check if email already exists.
                    connection.pool.query("SELECT id FROM users WHERE username = ?", username, function(err, rows) {
                        if (err)
                            return done(err);
                        if (rows.length) {
                            return done(null, false, req.flash('signupMessage', 'Username is already taken.'));
                        } else {
                            var newUser = {
                                username: username,
                                email: req.body.email,
                                password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)  // use the generateHash function in our user model
                            };

                            connection.pool.query('INSERT INTO users SET ?', newUser, function(err, rows) {
                                newUser.id = rows.insertId;
                                return done(null, newUser);
                            });
                        }
                    });
                }
            });
        })
    );

    // Login handler
    passport.use('local-login', new LocalStrategy({         
            usernameField : 'username', passwordField : 'password', passReqToCallback : true 
        }, function(req, username, password, done) {
            connection.pool.query("SELECT id, username, password FROM users WHERE username = ?", username, function(err, rows){
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Username not found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Wrong password!!!')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};