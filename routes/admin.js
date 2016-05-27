var adminController = require('../controllers/admin-controller');
var checkAdmin = require('../middlewares/check-admin-account');

module.exports = {
    configure: function (app, passport) {
        // GET: /register
        app.get('/admin', checkAdmin, function(req, res) {
            adminController.getIndex(req, res);
        });        
    }
};