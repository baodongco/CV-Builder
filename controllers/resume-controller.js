/*
references: https://www.npmjs.com/package/html-pdf
*/
var connection    = require('../connection');
var sql       = require('../services/resume-services');
// import models
var Resume        = require('../models/resume');
var certificationModel = require('../models/certification');
var educationModel     = require('../models/education');
var experienceModel    = require('../models/experience');
var projectModel       = require('../models/project');
var skillModel         = require('../models/skill');

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
	
    /**
     * @param  req
     * @param  res
     * @param type = 'html'
     * @return resume
     */
     this.getResume = function (req, res) {
      //demo w/o DB
      //var resume = demoUser;        
      if (req.query.type == 'pdf') {
        getResumeDataById(req.params.id, function (resume) {
          responsePdf(req, res, resume);
        });        
      } else {
        getResumeDataById(req.params.id, function (resume) {
            // responseHtml(res, resume);
            if (resume) {
              console.log('resume in render func', resume);
              res.render('cv-template/skeleton', {resume: resume});
            } else {
              res.send('File not found');
            }
          });        
      };  

    };

    /**
     * @param  res response
     * @param  user - user data
     * @return resume in pdf format
     */
     var responsePdf = function (req, res, resume) {
      var ejs = require('ejs');
      ejs.renderFile('./views/cv-template/skeleton.ejs', {resume: resume}, null, function (err,html) {
        if (err) {
          console.log(err.stack);
          throw err;
        } else {
          if (resume) {
            var pdf = require('html-pdf');
            var options = require('../config/cv-pdf.js');
            options.base = "http://" + req.headers.host;
            pdf.create(html,options).toStream(function(err, stream){
              res.setHeader("content-type", "application/pdf");
              stream.pipe(res);
            });
          } else {
            res.headers(404);
            res.send('File not found');
          }
        }
      });
    };

    /**
     * @param  res - response
     * @param  user - user data
     * @return resume in html format
     */
     var responseHtml = function (res, resume) {
      if (resume) {
        res.render('cv-template/skeleton', {resume: resume});
      } else {
        res.headers(404);
        res.send('File not found');
      }
    };
    /**
     * @param  id resumeId
     * @param  callback do whatever you want with returned resume data
     */
    var getResumeDataById = function (id, callback) {     
      connection.pool.query("CALL udsp_getAllResumeData(?)", id, function (err, rows) {
        if (err) {
          console.log(err);
        } else{

          // resume
          var resume = new Resume(rows[0][0]);

          // certifications
          var certifications = [];
          for (var i = 0; i < rows[1].length; i++) {
            certifications[i] = new certificationModel(rows[1][i]);
          };
          resume.certifications = certifications;

          // educations
          var educations = [];
          for (var i = 0; i < rows[2].length; i++) {
            educations[i] = new educationModel(rows[2][i]);
          };
          resume.educations = educations;
          
          //expertiences
          var expertiences = [];
          for (var i = 0; i < rows[3].length; i++) {
            expertiences[i] = new experienceModel(rows[3][i]);
          };
          resume.expertiences = expertiences;

          // projects
          var projects = [];
          for (var i = 0; i < rows[4].length; i++) {
            projects[i] = new projectModel(rows[4][i]);
          };
          resume.projects = projects;projects

          // skills
          var skills = [];
          for (var i = 0; i < rows[5].length; i++) {
            skills[i] = new skillModel(rows[5][i]);
          };
          resume.skills = skills;

          callback(resume);
        };
      });       
    };
};

module.exports = new resumeController();