var cvController = require('../controllers/cv-controller');

module.exports = {
    configure: function (app) {
        app.get('/cv/:id', function(req, res) {
            cvController.getView(req, res);
        }); 
        app.get('/cv/:id/pdf', function(req, res) {
        	cvController.getDownload(req,res);
        });    
    }
};
