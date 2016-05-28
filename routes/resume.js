var resumeController = require('../controllers/resume-controller');

module.exports = {
    configure: function (app) {

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
