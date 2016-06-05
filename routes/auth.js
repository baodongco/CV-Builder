var authController = require('../controllers/auth-controller');
var checkLogin = require('../middlewares/check-login');
var Email = require('../utilities/email');
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

        // GET: /activate
        app.get('/activate', function(req, res){
            authController.getActivate(req, res);           
        });

         // GET: /reset
        app.get('/reset', function(req, res){
            authController.getReset(req, res);           
        });

         // POST: /reset
        app.post('/reset', function(req, res){
            authController.postReset(req, res);           
        });

        // GET: /reset-complete
        app.get('/reset-complete', function(req, res){
            authController.getResetComplete(req, res);           
        });

        // POST: /reset-complete
        app.post('/reset-complete', function(req, res){
            authController.postResetComplete(req, res);           
        });

        // GET: /reset-form
        app.get('/reset-form', function(req, res){
            authController.getResetForm(req, res);           
        });


        // GET: /login
        app.get('/login', function(req, res) {
            authController.getLogin(req, res);
        });

        // POST: /login
        app.post('/login', passport.authenticate('local-login', {
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }), function (req, res) {
            // Set cookie so that user won't login again.
            if (req.body.remember) req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;

            res.redirect('/');
        });

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

        app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

        app.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/login' }),
            function(req, res) {
                res.redirect('/');
            });
    }
};