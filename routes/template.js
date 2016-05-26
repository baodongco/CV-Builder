var templateController = require('../controllers/template-controller');

module.exports = {
    configure: function (app) {
        app.get('/template/:id', function(req, res) {
            templateController.getView(req, res);
        }); 
        app.get('/template/:id.pdf', function (req, res) {
        	templateController.getDownload(req,res);
        })    
    }
};
