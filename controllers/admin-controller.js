var connection = require('../connection');
var query = require('../services/user-services');

function adminController() {
    this.getIndex = function (req, res) {
        connection.pool.query(query.getAllUsers, function (err, users) {
            res.render('admin/index', {title: 'Admin page', users: users});
        });
    };
}

module.exports = new adminController();