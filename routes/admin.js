var adminController = require('../controllers/admin-controller');
var checkAdmin = require('../middlewares/check-admin-account');

module.exports = {
    configure: function (app, passport) {
        // GET: /register
        app.get('/admin', checkAdmin, function(req, res) {
            adminController.getIndex(req, res);
        });    
        
        app.get('/admin/user/disable/:id', function (req, res) {
            adminController.disableUser(req, res);
        });

        app.get('/admin/user/enable/:id', function (req, res) {
            adminController.enableUser(req, res);
        });
    }
};