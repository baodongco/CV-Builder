 var bcrypt = require('bcrypt-nodejs');

var connection = require('../connection');
var queries = require('../services/user-services');
var RegisterUser = require('../models/register-user');
var LoginUser = require('../models/login-user');
var PassModification = require('../models/password-modification');
var ResetPasswordInfo = require('../models/reset-password-info');
var Email = require('../utilities/email');
var EmailInfo = require('../models/email-info');
var config = require('config');
var activeUserSettings = config.get('cv-builder.active-user');

function authController() {
    // GET /register
    this.getRegister = function(req, res) {
        res.render('auth/register', {
            message: req.flash('signupMessage'), title: 'Register',req: req
        });
    };

    // POST /register
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


    // GET /login
    this.getLogin = function(req, res) {
        res.render('auth/login', {
            message: req.flash('loginMessage'), title: 'Login', req: req
        });
    };

    // POST /login
    this.postLogin = function(req, done) {
        var loginUser = new LoginUser(req.body);

        connection.pool.query(queries.login, loginUser.username, function(err, rows) {
            if (!rows.length)
                return done(null, false, req.flash('loginMessage', 'Username not found or this account is disabled'));
            // Wrong password
            else if (!bcrypt.compareSync(loginUser.password, rows[0].password))
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


    // GET /activate
    this.getActivate = function(req, res){
        var activationCode = req.query.guid;
        var ttl = activeUserSettings['ttl'];
        var isError = true;
        var index = 0;
        var message = '';
    
        connection.pool.query("CALL SP_ACTIVATE_ACCOUNT('"+ activationCode +"'," + ttl +")",function(err, rows){
            // console.log("SP_ACTIVATE_ACCOUNT('"+ activationCode +"'," + ttl +")");
            if (err){
                // console.log(err);
                message = err.message;
                index = message.indexOf(':');
                message = message.substring(index + 1);
            } else {
                message = 'Your account has been activated. Please enjoy!!';
                isError = false;
            }
    
            if (isError) {
                req.flash('homeMessage', message);
                res.redirect('/');
            } else {
                req.flash('loginMessage', message);
                res.redirect('/login');
            }
        });
    };


    // GET /reset
    this.getReset = function(req, res){
         res.render('auth/reset', {
            message: req.flash('resetMessage'), title: 'Reset',req:req
        });
    };

    // POST /reset
    this.postReset = function(req, res){
        var email_address = req.body.email;
        connection.pool.query("CALL SP_RESET_PASSWORD('"+ email_address +"')",function(err, rows){
            console.log("SP_RESET_PASSWORD('"+ email_address +"')");
            var index = 0;
            var message = '';
            var uuid = '';
            var username = '';

            if (err) {
                console.log(err);
                message = err.message;
                index = message.indexOf(':');
                message = message.substring(index + 1);
            } else {
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

    
    // GET: /reset
    this.getResetComplete = function(req, res){
       var guid = req.query.guid;
        var ttl = activeUserSettings['ttl'];
        var isError = true;
        var index = 0;
        var message = '';
        var _guid = '';
        var sqlState = '';
        var uuid = '';    

        connection.pool.query("CALL SP_RESET_PASSWORD_COMPLETE('"+ guid +"',"+ ttl +")", function(err, rows){

            if (err) {
                console.log(err);
                message = err.message;
                index = message.indexOf(':');
                message = message.substring(index + 1);
                sqlState = err.sqlState;
            } else {
                console.log(rows);
                isError = false;
                message = 'Enter your new password to reset!!';
                _guid = rows[0][0]['guid'];
            }

            console.log(message);
            console.log(sqlState);

            var compare = sqlState.localeCompare('49000');
            console.log("=================="+compare);

            if(compare == 0){
                var msg = message.split(':');
                
                 // send email for reset password
                var emailInfo = new EmailInfo(msg[1], msg[2], msg[0]);
                var email = new Email(emailInfo);
                email.sendEmailResetPassword();

                // 
                message = 'Expired link to reset your password!!\n. Your new activate link has been sent to your email address. Please check again!!';
            }

            req.flash('homeMessage', message);

            if (isError) {
                res.redirect('/');
            } else {
                res.redirect('/reset-form?guid='+_guid);
            }

            console.log(message);
        });
    };

    // POST: /reset
    this.postResetComplete = function(req, res){
        var resetPasswordInfo = new ResetPasswordInfo(req.body);

         connection.pool.query(queries.updatePassword, [resetPasswordInfo.newHasingPass, resetPasswordInfo.guid], function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                req.flash('loginMessage', 'Password has been reset successful!!');
                res.redirect('/login');
            }
        });

    };

    // GET: /reset-form
    this.getResetForm = function(req, res){
        res.render('auth/reset-form', {
            message: req.flash('resetMessage'), title: 'Reset-form', guid: req.query.guid
        });
    };


    // GET: /change-password
    this.getChangePassword = function (req, res) {
        res.render('auth/change-password', { title: 'Change password', message: req.flash('changePass'), 
            username: req.user.username, id: req.user.id });
    };

    // POST: /change-password
    this.postChangePassword = function (req, res) {
        var user = new PassModification(req.body);
        
        connection.pool.query(queries.getUserById, user.id, function(err, rows) {
            if (!bcrypt.compareSync(user.oldPass, rows[0].password)) {
                req.flash('changePass', 'Old password is incorrect');
                res.redirect('/change_password');
            } else if (user.oldPass == user.newPass) {
                req.flash('changePass', 'Old password and new password are the same');
                res.redirect('/change_password');
            } else {
                connection.pool.query(queries.changePassword, [user.newHasingPass, user.id], function(err, rows) {
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