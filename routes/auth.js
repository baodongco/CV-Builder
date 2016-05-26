var authController = require('../controllers/auth-controller');
var cache = require('../middlewares/cache-login-user');

module.exports = {
    configure: function (app, passport) {
        // GET: /register
        app.get('/register', function(req, res) {
            authController.getRegister(req, res);
        });

        // POST: /register
        app.post('/register', function (req, res) {
            authController.postRegister(req, res);
        });


        // GET: /login
        app.get('/login', function (req, res) {
            authController.getLogin(req, res);
        });

        // POST: /login
        app.post('/login', passport.authenticate('local-login', {             
                failureRedirect : '/login', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }), function(req, res) { cache.action(req, res); });

        // Logout.
        app.get('/logout', function (req, res) {
            authController.logout(req, res);
        });
    }
};