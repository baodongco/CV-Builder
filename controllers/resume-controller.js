/*
references: https://www.npmjs.com/package/html-pdf
 */

var connection = require('../connection');
var queries = require('../services/resume-services');

function resumeController() {
      var demoUser = {
        id: 1,
        firstName: "Tran",
        lastName:"Dung Sy",
        email: "sybikhung@gmail.com",
        phone: "0123456789",
        website: "google.com",
        address: "Abc, Vietnam",
        sumHeadline: "<h5><em>Sum of</em></h5> sumHeadline sumHeadline sumHeadline sumHeadline sumHeadline sumHeadline sumHeadline ",
        sumContent: "<h4><em>Sum of</em></h4> sumContent sumContent sumContent sumContent sumContent sumContent sumContent sumContent sumContent",
        photoUrl: "/public/images/sysysy.png",
        publiclink: "https://facebook.com/BillGates",
        skills: [{
          name: "C#", expertise: "5",
          experience: "3 years"
        }, { 
          name: "PHP", expertise: "3",
           experience: "1 year", lastUsed: "Tuan truoc"
        }],
        projects: [{
          title: "Tam su cung nguoi la",
          url: "google.com",
          startTime: "3/5/1999",
          endTime: "5/3/2000",
          detail: "Detail Detail Detail Detail Detail Detail Detail Detail"
        }, {
          title: "Tam su cung nguoi quen",
          url: "google.com",
          startTime: "3/5/2009",
          endTime: "5/3/2011",
          detail: "Detail Detail Detail Detail Detail Detail Detail Detail"
        }]
      };
      var demoStyle = "styles-1";

    /**
     * @param  req
     * @param  res
     * @param type = 'html'
     * @return resume
     */
    this.getResume = function (req, res) {
        
        var resume = getResumeDataById(req.params.id);
        console.log(resume);
        if (resume === {}) {
          res.status(404)
          res.send('File not found');
        }
        //demo w/o DB
        //var resume = demoUser;        
        if (req.query.type == 'pdf') {
          responsePdf(req, res, resume);
        } else {
          responseHtml(res, resume);
        };        
    };

    /**
     * @param  res response
     * @param  user - user data
     * @return resume in pdf format
     */
    var responsePdf = function (req, res, user, template) {
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
    var responseHtml = function (res, user, template) {
      res.render('cv-template/skeleton', {resume: resume});
    };

    var getResumeDataById = function (id) {
      connection.pool.query(queries.getResumeById, id, function (err, rows) {
        if (!rows[0]) {
          console.log(!rows[0]);
          return {};
        } else {
          console.log(resume);
          connection.pool.query(queries.getSkillsByResumeId, resume.id, function (err, rows) {
            if (!rows) {
              resume.skills = undefined;
            } else {
              resume.skills = rows;
            }
          });
          connection.pool.query(queries.getEducationsByResumeId, resume.id, function (err, rows) {
            if (!rows) {
              resume.educations = undefined;
            } else {
              resume.educations = rows;
            }
          });
          connection.pool.query(queries.getCertificationsByResumeId, resume.id, function (err, rows) {
            if (!rows) {
              resume.certifications = undefined;
            } else {
              resume.certifications = rows;
            }
          });
          connection.pool.query(queries.getExperiencesByResumeId, resume.id, function (err, rows) {
            if (!rows) {
              resume.experiences = undefined;
            } else {
              resume.experiences = rows;
            }
          });
          return resume;
        }
      });
    }
    
};

module.exports = new resumeController();