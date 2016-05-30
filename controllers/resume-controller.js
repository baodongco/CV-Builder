var query = require('../services/resume-services');
var resumeModel = require('../models/resume');
var educationModel = require('../models/education');
var experienceModel = require('../models/experience');
var certificationModel = require('../models/certification');
var projectModel = require('../models/project');
var skillModel = require('../models/skill');
var connection = require('../connection');

function resumeController() {
	this.insertResume = function(req, res) {
		var resume = new resumeModel(req.body);				
		// insert resume	
		connection.pool.query(query.insertResume, resume, function(err, rows) {
			// insert sections
			if (req.body.education != null) {
				req.body.education.forEach(function(item) {	
					item.resId = rows.insertId;
					var education = new educationModel(item);	
					connection.pool.query(query.insertEducation, education);
				});								
			}

			if (req.body.experience != null) {				
				req.body.experience.forEach(function(item) {
					item.resId = rows.insertId;
					var experience = new experienceModel(item);
					connection.pool.query(query.insertExperience, experience);				
				});
			}

			if (req.body.certification != null) {				
				req.body.certification.forEach(function(item) {
					item.resId = rows.insertId;
					var certification = new certificationModel(item);
					connection.pool.query(query.insertCertification, certification);				
				});
			}

			if (req.body.project != null) {				
				req.body.project.forEach(function(item) {
					item.resId = rows.insertId;
					var project = new projectModel(item);
					connection.pool.query(query.insertProject, project);				
				});
			}
			
			if (req.body.skill != null) {				
				req.body.skill.forEach(function(item) {
					item.resId = rows.insertId;
					var skill = new skillModel(item);
					connection.pool.query(query.insertSkill, skill);				
				});
			}
		});
	};
};

module.exports = new resumeController();