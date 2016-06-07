var adminController = require('../controllers/admin-controller');
var checkAdmin = require('../middlewares/check-admin-account');

module.exports = {
    configure: function (app) {
        // GET: /register
        app.get('/admin', checkAdmin, function (req, res) {
            adminController.getIndex(req, res);
        });

        app.get('/cv/:name/:id', checkAdmin, function (req, res) {
            adminController.listAllCVOfAUser(req, res);
        });

        app.get('/admin/user/disable/:id', function (req, res) {
            adminController.disableUser(req, res);
        });

        app.get('/admin/user/enable/:id', function (req, res) {
            adminController.enableUser(req, res);
        });

        app.get('/admin/user/promote/:id', function (req, res) {
            adminController.promoteAdmin(req, res);
        });

        app.get('/admin/user/demote/:id', function (req, res) {
            adminController.demoteAdmin(req, res);
        });
    }
};