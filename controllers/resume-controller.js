/*
references: https://www.npmjs.com/package/html-pdf
 */
Q = require('q');
var connection    = require('../connection');
var sql       = require('../services/resume-services');
// import models
var Resume        = require('../models/resume');
var Certification = require('../models/certification');
var Education     = require('../models/education');
var Experience    = require('../models/experience');
var Project       = require('../models/project');
var Skill         = require('../models/skill');

function resumeController() {
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
        getResumeDataById(req.params.id).then(function (resume) {
          if (resume === null) {
            res.status(404)
            res.send('File not found');
          } else {
            responsePdf(req, res, resume);
          }
        });        
      } else {
        getResumeDataById(req.params.id).then(function (resume) {
          if (resume === null) {
            res.status(404)
            res.send('File not found');
          } else {
            responseHtml(res, resume);
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
              var pdf = require('html-pdf');
              var options = require('../config/cv-pdf.js');
              options.base = "http://" + req.headers.host;
              pdf.create(html,options).toStream(function(err, stream){
                res.setHeader("content-type", "application/pdf");
                stream.pipe(res);
              });
          };
      });
    };

    /**
     * @param  res - response
     * @param  user - user data
     * @return resume in html format
     */
    var responseHtml = function (res, resume) {
      res.render('cv-template/skeleton', {resume: resume});
    };

    var getResumeDataById = function (id) {
      var defered = Q.defer();
      connection.pool.query(sql.getResumeById, id, function (err, rows) {
        if (err) {
          defered.reject(err);
        } else {
          parseArray(id, sql.getCertificationsByResumeId, Certification, function (certs) {
            parseArray(id,  sql.getExperiencesByResumeId, Experience, function (exps) {
              parseArray(id, sql.getEducationsByResumeId, Education, function (edus) {                
                parseArray(id, sql.getProjectsByResumeId, Project, function (projects) {
                  parseArray(id, sql.getSkillsByResumeId, Skill, function (skills) {
                    resume = new Resume(rows[0]);
                    resume.skills         = skills;
                    resume.experiences    = exps;
                    resume.educations     = edus;
                    resume.certifications = resume.certs;
                    resume.projects       = projects;
                    console.log(resume);
                    defered.resolve(resume);
                  });
                });
              });
            });
          });
        }        
      }); 
      return defered.promise;             
    };      

    /**
     * @param  query string
     * @param  id of resume
     * @param  Ojb type of attribute
     * @return array of objs
     */
    var parseArray = function (id, query, Obj, callback) {
      connection.pool.query(query, id, function (err, rows) {
        if (err) {
          callback(err, [])
        } else { 
          var array = [];
          for (var i = 0; i < rows.length; i++) {
            array[i] = new Obj(rows[i]);
          };    
          callback(array);
        }
      });    
    };
};

module.exports = new resumeController();