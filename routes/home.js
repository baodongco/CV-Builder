var homeController = require('../controllers/home_controller');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = {
    configure: function (app) {
        app.get('/', function(req, res) {
            homeController.get(res);
        });     
    }
};
