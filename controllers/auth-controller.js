var bcrypt = require('bcrypt-nodejs');

var connection = require('../connection');
var queries = require('../utilities/queries');

function authController() {
    this.getRegister = function (req, res) {
        res.render('auth/register', { message: req.flash('signupMessage') });
    };
    
    this.postRegister = function (req, username, password, done) {
        // Check if username already exists.
        connection.pool.query(queries.checkUserByEmail, req.body.email, function(err, rows) {
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'Email is already taken.'));
            } else {
                // Check if email already exists.
                connection.pool.query(queries.checkUserByUsername, username, function(err, rows) {
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'Username is already taken.'));
                    } else {
                        var newUser = {
                            username: username,
                            email: req.body.email,
                            // Hash password
                            password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
                        };

                        connection.pool.query(queries.registerUser, newUser, function(err, rows) {
                            newUser.id = rows.insertId;
                            return done(null, newUser);
                        });
                    }
                });
            }
        });
    };
    
    
    this.getLogin = function (req, res) {
        res.render('auth/login', { message: req.flash('loginMessage') });
    };
    
    this.postLogin = function (req, username, password, done) {
        connection.pool.query(queries.login, username, function(err, rows){
            if (!rows.length)
                return done(null, false, req.flash('loginMessage', 'Username not found or this account is disabled')); // req.flash is the way to set flashdata using connect-flash
            // if the user is found but the password is wrong
            else if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'Wrong password!!!')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
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
    }
}

module.exports = new authController();