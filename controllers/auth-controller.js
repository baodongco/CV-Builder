var connection = require('../DAL/connection');

function authController() {
    this.getRegister = function (req, res) {
        res.render('auth/register', { message: req.flash('signupMessage') });
    };
    
    this.getLogin = function (req, res) {
        res.render('auth/login', { message: req.flash('loginMessage') });
    };

    this.logout = function (req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = new authController();