var templateController = require('../controllers/template-controller');

module.exports = {
    configure: function (app) {
        app.get('/template', function(req, res) {
            templateController.getView(req, res);
        }); 
        app.get('/template-download', function(req, res) {
        	templateController.getDownload(req,res);
        });    
    }
};
