var resumeController = require('../controllers/resume-controller');
var getId = require('../middlewares/get-user-id')
var checkLogin = require('../middlewares/check-login')

module.exports = {
	configure: function (app) {
		app.post('/resume', checkLogin, getId, function (req, res) {
			resumeController.insertResume(req, res);
		});

	}
};