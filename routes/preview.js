var previewController = require('../controllers/preview-controller');

module.exports = {
    configure: function (app) {
        app.get('/preview/:id', function(req, res) {
            previewController.get(req, res);
        });     
    }
};
