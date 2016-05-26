var adminController = require('../controllers/admin-controller');

module.exports = {
    configure: function (app, passport) {
        // GET: /register
        app.get('/admin', function(req, res) {
            adminController.getIndex(req, res);
        });        
    }
};