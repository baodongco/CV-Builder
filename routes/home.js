var homeController = require('../controllers/home-controller');

module.exports = {
    configure: function (app) {
        app.get('/', function(req, res) {
            homeController.get(req, res);
        });     
    }
};
