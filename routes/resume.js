var resumeController = require('../controllers/resume-controller');
var getId = require('../middlewares/get-user-id')
var checkLogin = require('../middlewares/check-login')

module.exports = {
	configure: function (app) {
		app.post('/resume', checkLogin, getId, function (req, res) {
			resumeController.insertResume(req, res);
		});
		/**
    	 * @return resumes list of current user
    	 */
    	app.get('resumes', function (req, res) {
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

	}
};
