var authController = require('../controllers/auth-controller');
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

        // GET: /activate
        app.get('/activate', function(req, res){
            authController.getActivate(req, res);           
        });

         // GET: /reset
        app.get('/reset', function(req, res){
            authController.getReset(req, res);           
        });

         // POST: /reset
        app.get('/reset', function(req, res){
            authController.postReset(req, res);           
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
    }
};