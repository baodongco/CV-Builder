var di = require('di4js');
var resumeModel = require('../models/resume')

function resumeController() {
	this.insertResume = function (req, res) {		
		di.resolve('cvservice').insertResume(req.body, function (insertId) {
			res.redirect('/preview/' + insertId);
		});
	};
}