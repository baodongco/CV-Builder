var authController = require('../controllers/auth-controller');
var checkLogin = require('../middlewares/check-login');
var Email = require('../models/email');
var EmailInfo = require('../models/email-info');

module.exports = {
    configure: function(app, passport) {
        // GET: /register
        app.get('/register', function(req, res) {
            authController.getRegister(req, res);
        });

        // POST: /register
        app.post('/register', function(req, res) {
            authController.postRegister(req, res);
        });


        // GET: /login
        app.get('/login', function(req, res) {
            authController.getLogin(req, res);
        });

        // POST: /login
        app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

        // Logout.
        app.get('/logout', function(req, res) {
            authController.logout(req, res);
        });

        // GET: /change_password
        app.get('/change_password', checkLogin, function (req, res) {
            authController.getChangePassword(req, res);
        });

        // POST: /change_password
        app.post('/change_password', function (req, res) {
            authController.postChangePassword(req, res);
        });
    }
};