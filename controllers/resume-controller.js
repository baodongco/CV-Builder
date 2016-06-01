/*
references: https://www.npmjs.com/package/html-pdf
*/
var connection    = require('../connection');
var sql       = require('../services/resume-services');
// import models
var Resume         = require('../models/resume');
var certificationModel = require('../models/certification');
var educationModel     = require('../models/education');
var experienceModel    = require('../models/experience');
var projectModel       = require('../models/project');
var skillModel         = require('../models/skill');

function resumeController() {
    this.createResume=function(req, res) {
      res.render('input/input',{title:'Input', req: req, message: req.flash('Input') });
    }
    this.insertResume = function(req, res) {
        var resume = new Resume(req.body);
        console.log(req.body);
        console.log(resume);
        // insert resume
        connection.pool.query(sql.insertResume, resume, function(err, rows) {
            if(err) console.log(err);
            // insert sections
            if (req.body.education != null) {
                req.body.education.forEach(function(item) {
                    item.resId = rows.insertId;
                    console.log(item);
                    var education = new educationModel(item);
                    connection.pool.query(sql.insertEducation, education);
                });
            }

            if (req.body.experience != null) {
                req.body.experience.forEach(function(item) {
                    item.resId = rows.insertId;
                    var experience = new experienceModel(item);
                    connection.pool.query(sql.insertExperience, experience);
                });
            }

            if (req.body.certification != null) {
                req.body.certification.forEach(function(item) {
                    item.resId = rows.insertId;
                    var certification = new certificationModel(item);
                    connection.pool.query(sql.insertCertification, certification);
                });
            }

            if (req.body.project != null) {
                req.body.project.forEach(function(item) {
                    item.resId = rows.insertId;
                    var project = new projectModel(item);
                    connection.pool.query(sql.insertProject, project);
                });
            }

            if (req.body.skill != null) {
                req.body.skill.forEach(function(item) {
                    item.resId = rows.insertId;
                    var skill = new skillModel(item);
                    connection.pool.query(sql.insertSkill, skill);
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
        if (req.query.type == 'pdf') {
            getResumeDataById(req.params.id, function (resume) {
                if (resume) {
                    responsePdf(req, res, resume);
                } else {
                    res.send('File not found');
                }
            });
        } else {
            getResumeDataById(req.params.id, function (resume) {
            //
                if (resume) {
                    responseHtml(res, resume);
                } else {
                    res.send('File not found');
                }
            });
        }
    };

    /**
     * render view resume page
     * @param id of resume
     */
    this.getPreview = function (req, res) {                
        connection.pool.query(sql.getTemplates, function (err, temp_rows) {
            if(err) {
                throw err.stack
            } else {
                connection.pool.query("SELECT id FROM resume WHERE id = ?", req.params.id, function (err, res_rows) {
                    if (err) {
                    throw err.stack;
                    } else {
                        console.log('res_rows', res_rows);
                        if (!res_rows[0].id) {
                            res.status(404).send('File not found');
                        } else {
                            var can = false;
                            if (req.user && req.user.id == res_rows[0].id) {
                                can = true;
                            }
                            res.render('resume/preview',{ 
                                title: 'View resume',
                                resumeId: res_rows[0].id, 
                                templates: temp_rows,
                                canEdit: can,
                                req: req
                            });
                        }
                    }
                });
                
            }
        });               
    };

    /**
     * @param  rId id of resume
     * @param  tId id of template
     * @return code {success| error}
     */
    this.updateTemplate = function (req, res) {
        if ( req.params.rId && req.params.tId && req.user) {
            connection.pool.query("select id from resume where id = ? and userId = ? ",
                [req.params.rId, req.user.id], 
                function (err , row) { 
                    if (err) {
                        res.status(400).send("User cannot edit resume");
                        throw err;
                    } else if (row[0].id) {
                        console.log('row', row);
                        connection.pool.query("UPDATE resume SET templateId = ? WHERE id = ?",
                            [req.params.tId, req.params.rId],
                            function (err, result) {
                                if (err) {
                                    res.status(400).send("Item not updated");
                                    throw err;
                                } else {
                                    console.log('update', result);
                                    res.status(200).send("Item updated");
                                }
                            }
                        );
                    }
                });
        } else {
            res.status(400).send("Please log in");
        }
    }

/*
==============================================================================================
  Helper functions
==============================================================================================
 */

    /**
     * @param  res response
     * @param  user - user data
     * @return resume in pdf format
     */
     var responsePdf = function (req, res, resume) {
        var ejs = require('ejs');
        ejs.renderFile('./views/cv-template/skeleton.ejs', {resume: resume}, null, function (err,html) {
            if (err) {
                throw err.stack;
            } else if (resume) {
                var pdf = require('html-pdf');
                var options = require('../config/cv-pdf.js');
                options.base = "http://" + req.headers.host;
                pdf.create(html,options).toStream(function(err, data){
                    if (err) {
                        throw err.stack;
                    } else {
                        res.setHeader("content-type", "application/pdf");
                        res.setHeader("content-disposition","inline; filename=resume.pdf");
                        
                        data.pipe(res);
                    }
                });
            } else {
                res.headers(404);
                res.send('File not found');
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
          throw err;
        } else {
            if (rows[0][0]){
                // resume
                var resume = new Resume(rows[0][0]);

                // certifications
                var certifications = [];
                for (var i = 0; i < rows[1].length; i++) {
                    certifications[i] = new certificationModel(rows[1][i]);
                }
                resume.certifications = certifications;

                // educations
                var educations = [];
                for (var i = 0; i < rows[2].length; i++) {
                    educations[i] = new educationModel(rows[2][i]);
                }
                resume.educations = educations;

                //expertiences
                var expertiences = [];
                for (var i = 0; i < rows[3].length; i++) {
                    expertiences[i] = new experienceModel(rows[3][i]);
                }
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
            } else {
                callback(null);
            }
        };
      });
    };
    
};

module.exports = new resumeController();
