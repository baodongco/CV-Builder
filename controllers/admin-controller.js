var di = require('di4js');

function adminController() {
    this.getIndex = function (req, res) {
        di.resolve('userservice').getAllUsers(function (users) {
            res.render('admin/index', {
                title: 'Admin page',
                loginId: req.user.id,
                loginUsername: req.user.username,
                users: users,
                message: req.flash('adminMessage')
            });
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
    };

    this.listAllCVOfAUser = function (req, res) {
        di.resolve('userservice').getAllCVOfAUser(req.params.id, function (resumes) {
            res.render('admin/resume', {
                title: 'List of CV',
                resumes: resumes,
                loginUsername: req.user.username,
                user: req.params.name
            });
        });
    }
}

module.exports = new adminController();