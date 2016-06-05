var di = require('di4js');

function adminController() {
    this.getIndex = function (req, res) {
        di.resolve('userservice').getAllUsers(function (users) {
            res.render('admin/index', {title: 'Admin page', loginId: req.user.id, users: users, message: req.flash('adminMessage')}); 
        });
    };
    
    this.disableUser = function (req, res) {
        di.resolve('userservice').disableUser(req.params.id, function () {
            res.redirect('/admin');
        });
    };

    this.enableUser = function (req, res) {
        di.resolve('userservice').enableUser(req.params.id, function () {
            res.redirect('/admin');
        });
    };
    
    this.promoteAdmin = function (req, res) {
        di.resolve('userservice').promoteAdmin(req.params.id, function () {
            res.redirect('/admin');
        });
    };
    
    this.demoteAdmin = function (req, res) {
        di.resolve('userservice').demoteAdmin(req.params.id, function () {
            res.redirect('/admin');
        });
    }
}

module.exports = new adminController();