var resumeController = require('../controllers/resume-controller');
var checkLogin = require('../middlewares/check-login')

module.exports = {
	configure: function (app) {
		app.post('/createresume', checkLogin, function (req, res) {                          
			    resumeController.insertResume(req, res);
		});
		/**
  	 * @return resumes list of current user
  	 */
  	app.get('/resumes', checkLogin, function (req, res) {
  		resumeController.getResumes(req,res);
  	});

		/**
		 * @param  id of resume
		 * @param  req.type {html|pdf}
		 * @return resume file base on type
		 */
    app.get('/resumes/:id', function (req, res) {
        resumeController.getResume(req, res);
    });

    app.get('/resumes/:id/preview', function(req, res) {
        resumeController.getPreview(req, res);
    }); 

    /**
     * change template for a resume
     * @param  iRd resume Id
     * @param  tId template Id
     * @return status code
     */
    app.get('/resumes/:rId/templates/:tId', function (req, res) {
      resumeController.updateTemplate(req, res);
    });

		app.get('/createresume', function(req,res){
			resumeController.createResume(req,res);
		});
	}
};
