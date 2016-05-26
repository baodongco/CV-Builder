var connection = require('../connection');
var query = require('../services/user-services');

function adminController() {
    this.getIndex = function (req, res) {
        if (req.isAuthenticated() && req.user.role == 'admin') {
            connection.pool.query(query.getAllUsers, function (err, users) {
                res.render('admin/index', {title: 'Admin page', users: users});
            });             
        } else {
            req.flash('homeMessage', 'You do not have priviledge to access.');
            res.redirect('/');
        }
    };
}

module.exports = new adminController();