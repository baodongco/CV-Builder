var di = require('di4js');

function resumeController() {
	this.insertResume = function (req, res) {		
		req.body.userId = req.user.id;
		di.resolve('cvService').insertResume(req.body, function (insertId) {
			res.redirect('/resumes/preview/' + insertId);
		});
	};
}

module.exports = new resumeController();