var connection = require('../connection');
var query = require('../services/user-services');

function adminController() {
    this.getIndex = function (req, res) {
        connection.pool.query(query.getAllUsers, function (err, users) {
            console.log(req.user.id);
            res.render('admin/index', {title: 'Admin page', loginId: req.user.id, users: users, message: req.flash('adminMessage')});
        });
    };
    
    this.disableUser = function (req, res) {
        connection.pool.query(query.disableUser, req.params.id, function (err, result) {
            res.redirect('/admin');
        });
    };

    this.enableUser = function (req, res) {
        connection.pool.query(query.enableUser, req.params.id, function (err, result) {
            res.redirect('/admin');
        });
    }
}

module.exports = new adminController();