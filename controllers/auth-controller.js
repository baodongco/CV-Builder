var bcrypt = require('bcrypt-nodejs');

var connection = require('../connection');
var queries = require('../services/user-services');
var RegisterUser = require('../models/register-user');
var LoginUser = require('../models/login-user');

function authController() {
    this.getRegister = function (req, res) {
        res.render('auth/register', { message: req.flash('signupMessage') });
    };
    
    this.postRegister = function (req, res) {
        var newUser = new RegisterUser(req.body);
        
        // Check if username already exists.
        connection.pool.query(queries.checkUserByEmail, newUser.email, function(err, rows) {
            if (rows.length) {
                req.flash('signupMessage', 'Email is already taken.');
                res.redirect('/register');
            } else {
                // Check if email already exists.
                connection.pool.query(queries.checkUserByUsername, newUser.username, function(err, rows) {
                    if (rows.length) {                        
                        req.flash('signupMessage', 'Username is already taken.');
                        res.redirect('/register');
                    } else {                                                
                        connection.pool.query(queries.registerUser, newUser, function(err, rows) {    
                            req.flash('registerConfirm', 'Check your email for activation link.');
                            res.redirect('/');                                                    
                        });
                    }
                });
            }
        });
    };
    
    
    this.getLogin = function (req, res) {
        res.render('auth/login', { message: req.flash('loginMessage') });
    };
    
    this.postLogin = function (req, done) {
        var user = new LoginUser(req.body);
        
        connection.pool.query(queries.login, user.username, function(err, rows){
            if (!rows.length)
                return done(null, false, req.flash('loginMessage', 'Username not found or this account is disabled')); 
            // Wrong password
            else if (!bcrypt.compareSync(user.password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'Wrong password!!!'));
            // Account not activated
            else if (rows[0].activationCode)
                return done(null, false, req.flash('loginMessage', 'Your account is not activated. Check your email for activation link.'));

            // Successful
            return done(null, rows[0]);
        });  
    };
    

    this.logout = function (req, res) {
        req.logout();
        res.redirect('/');
    };
    
    this.serializeUser = function (user, done) {
        done(null, user.id);  
    };
    
    this.deserializeUser = function (id, done) {
        connection.pool.query(queries.getUserById, id, function(err, rows){
            done(err, rows[0]);
        });
    };
}

module.exports = new authController();