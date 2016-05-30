var previewController = require('../controllers/preview-controller');

module.exports = {
    configure: function (app) {
        app.get('/preview', function(req, res) {
            previewController.get(req, res);
        });     
    }
};
