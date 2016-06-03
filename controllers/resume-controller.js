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
    this.getEditResume  = function(req, res) {
        getResumeDataById(req.params.id, function(resume) {
            res.render('', resume);
        });
    }

    this.createResume = function(req, res) {
      res.render('input/input',{title:'Input', req: req, message: req.flash('Input') });
    }

    this.insertResume = function(req, res) {        
        var resume = new Resume(req.body);
        resume.userId = req.user.id;
        resume.templateId = 1;
        console.log(req.body);
        // insert resume
        connection.pool.query(sql.insertResume, resume, function(err, rows) {
            if(err) console.log(err);
            // insert sections
            req.body.education.forEach(function(item) {                
                if (checkObject(item)) {
                    console.log('education hit');  
                    console.log(item);                  
                    item.resId = rows.insertId;
                    insertItem(item, 'education');                        
                }
            });

            req.body.experience.forEach(function(item) {
                if (checkObject(item)) {
                    console.log('experience hit');
                    console.log(item);
                    item.resId = rows.insertId;                    
                    insertItem(item, 'experience');
                }
            });

            req.body.certification.forEach(function(item) {
                if (checkObject(item)) {
                    console.log('certification hit');
                    console.log(item);
                    item.resId = rows.insertId;                    
                    insertItem(item, 'certification');
                }
            });

            req.body.project.forEach(function(item) {
                if (checkObject(item)) {
                    console.log('project hit');
                    console.log(item);
                    item.resId = rows.insertId;                    
                    insertItem(item, 'project');
                }
            });

            if (req.body.hasOwnProperty('skill')) {
                req.body.skill.forEach(function(item) {
                    if (checkObject(item)) {
                        console.log('skill hit');
                        console.log(item);
                        item.resId = rows.insertId;                    
                        insertItem(item, 'skill');
                    }
                });
            }

            //return resume Id
            res.redirect('/resumes/preview/' + rows.insertId);
        });
    };

    this.updateResume = function(req,res) {
        var resume = new Resume(req.body.resume);
        var resId = resume.id;
        delete resume.id;
        var query = connection.pool.query("UPDATE resume SET ?? WHERE id = ?", [resume, resume.id]);
        console.log(query);
        //handle education items
        req.body.education.forEach(function(item){
            if (item.hasOwnProperty('id')) {
                updateItem(item, 'education');
            } else {
                insertItem(item, 'education');
            }
        })
    };    

    function insertItem(item, table) {        
        connection.pool.query('INSERT INTO ' + table + ' SET ?', item);
    };

    function updateItem(item, table) {               
        var id = item.id;
        delete item.id;
        connection.pool.query('UPDATE ' + table + '  SET ?? WHERE id = ?', [item, id]);
    };

    function checkObject(obj){        
        for(var key in obj){            
            if (obj[key] == '') {
                return false;
            }
        }
        return true;
    };

    /**
     * get all resumes of user
     * 
     */
    this.getResumes = function (req, res) {
        connection.pool.query("SELECT userId, id, title, publicLink FROM resume WHERE userId =? ",
            req.user.id, function (err, rows) {
                if(err) {
                    throw err.stack;
                } else {
                    console.log('reuses', rows);
                    res.render('resume/all', { title: "My resumes", resumes: rows, req: req});
                }
            }
        )
    }

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
    this.getPreviewResume = function (req, res) {                
        connection.pool.query(sql.getTemplates, function (err, temp_rows) {
            if(err) {
                throw err.stack
            } else {
                connection.pool.query("SELECT id, userId FROM resume WHERE id = ?", req.params.id, function (err, res_rows) {
                    if (err) {
                    throw err.stack;
                    } else {
                        console.log('res_rows', res_rows);
                        if (!res_rows.length || req.user.id != res_rows[0].userId) {
                            res.status(404).send('File not found');
                        } else if (req.user.id == res_rows[0].userId) {                           
                            res.render('resume/preview',{ 
                                title: 'View resume',
                                resumeId: res_rows[0].id, 
                                templates: temp_rows,
                                req: req
                            });
                        }
                    }
                });
                
            }
        });               
    };

    /**
     * edit a single value in resume
     * @param  table : name of table contain resume's data (RESPEC)
     * @param  id: row id to update
     * @param  field: column to update
     * @param  value: new value
     * @return status code
     */
    this.postEditFieldResume = function (req, res) {
        console.log(req.body);
        var tables = ['resume', 'education', 'skill', 'project', 'experience', 'certification'];
        if ( tables.indexOf(req.body.table) != -1 ) {
            if (req.body.table == 'resume' || req.body.field == 'publicLink') {
                var query = sql.checkResumeEditable;
                var params = [req.body.id, req.user.id];  
            } else {
                var query = sql.checkResumeDataEditable;
                var params = [req.body.table, req.body.id, req.user.id];
            } 
            connection.pool.query(query, params, function (err , row) { 
                if (err) {
                    res.status(400).send("You cannot edit resume");
                    throw err;
                } else if (row.length) {
                    console.log('row', row);
                    connection.pool.query("UPDATE ?? SET ?? = ? WHERE id = ?",
                        [req.body.table, req.body.field, req.body.value, req.body.id],
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
            res.status(403).send("Bad request");
        }
    }

    /**
     * set resume as public or private
     * @param  id resume
     * @param  status
     * @return code and ?generated url
     */
    this.getPrivacyResume = function (req, res) {
        console.log('here');
        var Guid = require('guid');
        // generate url /resumes/id/token if status=true
        var publicLink = req.body.status? "/resumes/"+req.params.id+"/" + Guid.create() : null;

        connection.pool.query("SELECT id, publicLink FROM resume WHERE id = ? and userId = ?",
            [req.params.id, req.user.id], function (err, row) {
                if (err) {
                    throw err;
                    res.status(401).send('Unauthorized');
                } else if (row[0].id) {
                    // if status = true but publiclink exists. refuse it
                    if (row[0].publicLink && req.body.status) {
                        res.status(403).send("Resume's already been public");
                    } else {
                        connection.pool.query(updatePublicLink, [publicLink, req.params.id], function (err, result) {
                            if (err) {
                                throw err;
                                res.status(503).send('Unable to update resume');
                            } else {
                                res.status(200).send({publicLink: publicLink});
                            }
                        });
                    }
                }
            }
        );
    };

    /**
     * delete resume and related data
     * @param  id resume
     */
    this.deleteResume = function (req, res) {
        connection.pool.query("SELECT id FROM resume WHERE id = ? and userId = ?",
            [req.params.id, req.user.id], function (err, row) {
                if (err) {
                    throw err;
                    res.status(401).send('Unauthorized');
                } else {
                    if (row[0].id) {
                        connection.pool.query("CALL udsp_deleteResume(?)", req.params.id ,function (err, result) {
                            if (err) {
                                throw err;
                                res.status(503).send('Unable to delete resume');
                            } else {
                                res.status(200).send('Resume deleted');
                            }
                        });
                    }  
                }
            }
        );
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
