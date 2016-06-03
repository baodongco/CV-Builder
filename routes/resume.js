var resumeController = require('../controllers/resume-controller');
var checkLogin = require('../middlewares/check-login')

module.exports = {
	configure: function (app) {
        /**
         * get create resume view
         */
        app.get('/resumes/create', checkLogin, function(req,res){
          resumeController.createResume(req,res);
        });
        /**
         * create new resume
         * @param  req.body.[data]
         */
		app.post('/resumes/create', checkLogin, function (req, res) {                          
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
        /**
         * get resume preview
         * @param  id resume
         */
        app.get('/resumes/preview/:id', function(req, res) {
            resumeController.getPreviewResume(req, res);
        });
        /**
         * get publi view of resume
         * @param  id resume
         * @param  token
         */
        app.get('/resumes/public/:id/:token', function (req, res) {
            resumeController.getPublicResume(req, res);
        });
        /**
         * get edit resuem view
         * @param  id resume
         */
        app.get('/resumes/edit/:id', checkLogin, function (req, res) {
            resumeController.getEditResume(req,res);
        })

        /**
         * update a resume
         * @param  id of resume
         * @param  body data
         * @return status code
         */
        app.post('/resumes/edit/:id', function (req, res) {
          resumeController.postEditResume(req, res);
        });

        /**
         * edit a single row value in resume
         * @param  table : name of table contain resume's data
         * @param  id: row id to update
         * @param  field: column to update
         * @param  value: new value
         * @return status code
         */
        app.post('/resumes/edit-field', function (req, res) {
          resumeController.postEditFieldResume(req,res);
        })
        /**
         * delete a resume
         * @param  id of resume
         * @return status code
         */
        app.delete('/resumes/:id', function (req, res) {
          resumeController.deleteResume(req, res);
        })
	}
};
