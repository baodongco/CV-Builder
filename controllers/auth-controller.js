var bcrypt = require('bcrypt-nodejs');

var connection = require('../connection');
var queries = require('../services/user-services');
var RegisterUser = require('../models/register-user');
var PassModification = require('../models/password-modification');
var Email = require('../models/email');
var EmailInfo = require('../models/email-info');
var config = require('config');
var activeUserSettings = config.get('cv-builder.active-user');

function authController() {
    this.getRegister = function(req, res) {
        res.render('auth/register', {
            message: req.flash('signupMessage'), title: 'Register'
        });
    };

    this.postRegister = function(req, res) {
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
                            req.flash('homeMessage', 'Check your email for activation link.');
                            res.redirect('/');
                        });
                        // send email
                        var emailInfo = new EmailInfo(newUser.username, newUser.email, newUser.activationCode);
                        var email = new Email(emailInfo);
                        email.sendEmail();
                    }
                });
            }
        });
    };


    this.getLogin = function(req, res) {
        res.render('auth/login', {
            message: req.flash('loginMessage'), title: 'Login'
        });
    };

    this.postLogin = function(req, done) {
        connection.pool.query(queries.login, req.body.username, function(err, rows) {
            if (!rows.length)
                return done(null, false, req.flash('loginMessage', 'Username not found or this account is disabled'));
            // Wrong password
            else if (!bcrypt.compareSync(req.body.password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'Wrong password!!!'));
            // Account not activated
            else if (rows[0].activationCode)
                return done(null, false, req.flash('loginMessage', 'Your account is not activated. Check your email for activation link.'));

            // Successful
            return done(null, rows[0]);
        });
    };


    this.logout = function(req, res) {
        req.logout();
        res.redirect('/');
    };

    this.getActivate = function(req, res){
        var activationCode = req.query.guid;
        var ttl = activeUserSettings['ttl'];
        var isError = true;
        var index = 0;
        var message = '';
    
        connection.pool.query("CALL SP_ACTIVATE_ACCOUNT('"+ activationCode +"'," + ttl +")",function(err, rows){  

            console.log("SP_ACTIVATE_ACCOUNT('"+ activationCode +"'," + ttl +")");
      
        if (err){
            console.log(err);
            message = err.message;
            index = message.indexOf(':');
            message = message.substring(index + 1);
         }else{
            message = 'Your account has been activated. Please enjoy!!';
            isError = false;
         }

        req.flash('homeMessage', message);
    
        if(isError){
           res.redirect('/');
        }else{
            res.redirect('/login');
        }
     });
    };

    this.getReset = function(req, res){
         res.render('auth/reset', {
            message: req.flash('resetMessage'), title: 'Reset'
        });
    };

     this.postReset = function(req, res){
        var email_address = req.body.email;

        connection.pool.query("CALL SP_RESET_PASSWORD('"+ email_address +"')",function(err, rows){  

        console.log("SP_RESET_PASSWORD('"+ email_address +"')");
      
        var index = 0;
        var message = ''; 
        var uuid = '';
        var username = '';
      
        if (err){
            console.log(err);
            message = err.message;
            index = message.indexOf(':');
            message = message.substring(index + 1);
         }else{
            message = 'Please check you email to reset your password!!';
            uuid = rows[0][0]['uuid'];
            username = rows[1][0]['username'];
            console.log('=========================uuid: ' + uuid);
            console.log('=========================username: ' + username);
            console.log(rows);

            // send email for reset password
             var emailInfo = new EmailInfo(username, email_address, uuid);
             var email = new Email(emailInfo);
             email.sendEmailResetPassword();
         }

         console.log(message);

        req.flash('homeMessage', message);
        res.redirect('/');
     });
         
    };

    this.getChangePassword = function (req, res) {
        res.render('auth/change-password', { title: 'Change password', message: req.flash('changePass'), 
            username: req.user.username, id: req.user.id });
    };

    this.postChangePassword = function (req, res) {
        var user = new PassModification(req.body);
        
        connection.pool.query('SELECT password FROM user WHERE id = ?', user.id, function(err, rows) {
            if (!bcrypt.compareSync(user.oldPass, rows[0].password)) {
                req.flash('changePass', 'Old password is incorrect');
                res.redirect('/change_password');
            } else if (user.oldPass == user.newPass) {
                req.flash('changePass', 'Old password and new password are the same');
                res.redirect('/change_password');
            } else {
                connection.pool.query('UPDATE user SET password = ? WHERE id = ?', [user.newHasingPass, user.id], function(err, rows) {
                    req.flash('homeMessage', 'Password updated successfully');
                    res.redirect('/');
                });
            }        
        });
    };

    this.serializeUser = function(user, done) {
        done(null, user.id);
    };

    this.deserializeUser = function(id, done) {
        connection.pool.query(queries.getUserById, id, function(err, rows) {
            done(err, rows[0]);
        });
    };
}

module.exports = new authController();