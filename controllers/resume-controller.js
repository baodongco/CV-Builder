/*
references: https://www.npmjs.com/package/html-pdf
*/
var multer = require('multer');
var fs = require('fs');
var imgName = "";
var path = require('path');
var jimp = require('jimp');

var connection = require('../DAL/connection');
var sql = require('../services/resume-services');
// import models
var Resume = require('../models/resume');
var certificationModel = require('../models/certification');
var educationModel = require('../models/education');
var experienceModel = require('../models/experience');
var projectModel = require('../models/project');
var skillModel = require('../models/skill');
var mysql      = require('mysql');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/photo');
    },
    filename: function (req, file, callback) {
        imgName = '1' + '_' + Date.now() + '.jpg';
        callback(null, imgName);
    }
});
var upload = multer({ storage: storage, limits: { fileSize: 5000000 } }).single('userPhoto');

function resumeController() {
    this.getEditResume = function (req, res) {
        var userId = req.user.id;
        var resId = req.params.id;       

        connection.pool.query('SELECT * FROM resume WHERE id = ? AND userId = ?', [resId, userId], function(err, rows){                                    
            if (rows[0]) {
                getResumeDataById(req.params.id, function (resume) {                    
                    imgName = resume.photoUrl;
                    res.render('input/edit', { title: 'Edit', req: req, message: req.flash('Edit'), resume: resume });
                });    
            } else {
                res.redirect('/');
            }
        });
    };

    this.createResume = function (req, res) {
        res.render('input/input', { title: 'Input', req: req, message: req.flash('Input') });
    }


    this.loadPhoto = function (req, res) {        
        console.log('hit loadphoto');
        if (imgName !== "") {
            console.log('hit0');
            fs.access("./public/photo/" + imgName, fs.F_OK, function (err) {
                if(err){
                    imgName = "";
                    res.status(200).send(null);
                } else {
                    var stats = fs.statSync("./public/photo/" + '2' + imgName);
                    var fileSizeInBytes = stats["size"];
                    var temp = '2'+imgName;
                    res.status(200).send(JSON.stringify({ i128: imgName, size: fileSizeInBytes }));
                }});}
            else {
                res.status(200).send(null);
            }
        }

        this.uploadPhoto = function (req, res) {
            if (req.body.op != "delete") {
                upload(req, res, function (err) {
                    if (err) {
                        if (err.code == "LIMIT_FILE_SIZE") {
                            req.flash('uploadMessage', 'File too large, choose another plz!');
                            res.redirect('/photo');
                        }
                        return res.end("Error loading file.");
                    }
                    var imgName2 = '1' + imgName;
                    var imgName3 = '2' + imgName;

                    jimp.read(path.normalize("./public/photo/" + imgName), function (err, imgName) {
                        if (err) throw err;
                    imgName.scaleToFit(400, 600)            // resize 
                        .quality(60)                 // set JPEG quality          
                        .write("./public/photo/" + imgName2); // save 
                    });
                    jimp.read(path.normalize("./public/photo/" + imgName), function (err, imgName) {
                        if (err) throw err;
                    imgName.scaleToFit(200, 300)            // resize 
                        .quality(60)                 // set JPEG quality 
                        .write("./public/photo/" + imgName3); // save 
                    });
                    res.status(200).send(JSON.stringify({ i128: imgName }));
                    console.log(req);

                });
            }
            else {
                fs.unlinkSync("./public/photo/" + req.body.nameImg);
                var nameImg2 = "./public/photo/" + '1' + req.body.nameImg;
                var nameImg3 = "./public/photo/" + '2' + req.body.nameImg;
                fs.unlinkSync(nameImg2);
                fs.unlinkSync(nameImg3);
                nameImg = "";
            }
        }

        this.insertResume = function (req, res) {
            var resume = new Resume(req.body);
            resume.userId = req.user.id;
            resume.templateId = 1;
            console.log(req.body);

        // insert resume
        connection.pool.query(sql.insertResume, resume, function (err, rows) {
            if (err) console.log(err);

            // insert sections
            req.body.education.forEach(function (item) {
                if (checkObject(item)) {
                    console.log('education hit');
                    console.log(item);
                    item.resId = rows.insertId;
                    insertItem(item, 'education');
                }
            });

            req.body.experience.forEach(function (item) {
                if (checkObject(item)) {
                    console.log('experience hit');
                    console.log(item);
                    item.resId = rows.insertId;
                    insertItem(item, 'experience');
                }
            });

            req.body.certification.forEach(function (item) {
                if (checkObject(item)) {
                    console.log('certification hit');
                    console.log(item);
                    item.resId = rows.insertId;
                    insertItem(item, 'certification');
                }
            });

            req.body.project.forEach(function (item) {
                if (checkObject(item)) {
                    console.log('project hit');
                    console.log(item);
                    item.resId = rows.insertId;
                    insertItem(item, 'project');
                }
            });

            if (req.body.hasOwnProperty('skill')) {
                req.body.skill.forEach(function (item) {
                    if (checkObject(item)) {
                        console.log('skill hit');
                        console.log(item);
                        item.resId = rows.insertId;
                        insertItem(item, 'skill');
                    }
                });
            }

            //redirect to preview page
            res.redirect('/resumes/preview/' + rows.insertId);
        });
    };

    this.updateResume = function (req, res) {        
        var resume = new Resume(req.body);
        var resId = resume.id;
        var userId = req.user.id;
        resume.userId = req.user.id;
        delete resume.id;
        
        connection.pool.query('SELECT * FROM resume WHERE id = ? AND userId = ?', [resId, userId], function(err, rows){                                    
            if (rows[0]) {
                connection.pool.query("UPDATE resume SET ? WHERE id = " + resId, resume);        

                //handle education items
                req.body.education.forEach(function (item) {
                    console.log(item);
                    if (item.hasOwnProperty('id')) {
                        console.log('hit true');                
                        if (Object.keys(item).length == 1) {                        
                            console.log('hit delete');
                            deleteItem(item, 'education');
                        } else {
                            if (checkObject(item)) {
                                console.log('hit update');
                                updateItem(item, 'education');
                            }                
                        };
                    } else {
                        console.log('hit false');
                        if (checkObject(item)) {
                            item.resId = resId; 
                            insertItem(item, 'education');
                        }
                    }
                });

                //handle experience items
                req.body.experience.forEach(function (item) {
                    console.log(item);
                    if (item.hasOwnProperty('id')) {
                        console.log('hit true');                
                        if (Object.keys(item).length == 1) {                        
                            console.log('hit delete');
                            deleteItem(item, 'experience');
                        } else {
                            if (checkObject(item)) {
                                console.log('hit update');
                                updateItem(item, 'experience');
                            }                
                        };
                    } else {
                        console.log('hit false');
                        if (checkObject(item)) {
                            item.resId = resId; 
                            insertItem(item, 'experience');
                        }
                    }
                });

                //handle project items
                req.body.project.forEach(function (item) {
                    console.log(item);
                    if (item.hasOwnProperty('id')) {
                        console.log('hit true');                
                        if (Object.keys(item).length == 1) {                        
                            console.log('hit delete');
                            deleteItem(item, 'project');
                        } else {
                            if (checkObject(item)) {
                                console.log('hit update');
                                updateItem(item, 'project');
                            }                
                        };
                    } else {
                        console.log('hit false');
                        if (checkObject(item)) {
                            item.resId = resId; 
                            insertItem(item, 'project');
                        }
                    }
                });

                //handle skill items
                req.body.skill.forEach(function (item) {
                    console.log(item);
                    if (item.hasOwnProperty('id')) {
                        console.log('hit true');                
                        if (Object.keys(item).length == 1) {                        
                            console.log('hit delete');
                            deleteItem(item, 'skill');
                        } else {
                            if (checkObject(item)) {
                                console.log('hit update');
                                updateItem(item, 'skill');
                            }                
                        };
                    } else {
                        console.log('hit false');
                        if (checkObject(item)) {
                            item.resId = resId; 
                            insertItem(item, 'skill');
                        }
                    }
                });

                //handle certification items
                req.body.certification.forEach(function (item) {
                    console.log(item);
                    if (item.hasOwnProperty('id')) {
                        console.log('hit true');                
                        if (Object.keys(item).length == 1) {                        
                            console.log('hit delete');
                            deleteItem(item, 'certification');
                        } else {
                            if (checkObject(item)) {
                                console.log('hit update');
                                updateItem(item, 'certification');
                            }                
                        };
                    } else {
                        console.log('hit false');
                        if (checkObject(item)) {
                            item.resId = resId; 
                            insertItem(item, 'certification');
                        }
                    }
                });

                res.redirect('/resumes/preview/' + resId);    
    } else {
        res.redirect('/');
    }
});     

};

    /**
     * insert an item of a section to table
     * 
     */
     function insertItem(item, table) {
        connection.pool.query('INSERT INTO ' + table + ' SET ?', item);
    };

    /**
     * update an item of a section to table
     * 
     */
     function updateItem(item, table) {
        console.log('start update');
        var id = item.id;
        delete item.id;
        console.log(item);        
        connection.pool.query('UPDATE ' + table + ' SET ? WHERE id = ' + id, item, function(err) {
            if (err) {
                console.log(err);
            }
        });        
    };

    /**
     * delete an item of a section to table
     * 
     */
     function deleteItem(item, table) {
        console.log('start delete');
        var query = mysql.format('DELETE FROM ' + table + ' WHERE id = ?', item.id);
        console.log(query);
        connection.pool.query('DELETE FROM ' + table + ' WHERE id = ?', item.id, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    /**
     * check if an item is valid
     * 
     */
     function checkObject(obj) {
        console.log('start checkObject');
        for (var key in obj) {
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
                if (err) {
                    throw err.stack;
                } else {
                    console.log('reuses', rows);
                    res.render('resume/index', { title: "My resumes", resumes: rows, req: req, message: req.flash('') });
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

    this.getPublicResume = function (req, res) {
        connection.pool.query("SELECT id FROM resume WHERE id = ? AND publicLink = ?", [req.params.id, req.params.token], function (err, row) {
            if (err) {
                throw err.stack;
            } else {
                if (row.length) {
                    getResumeDataById(req.params.id, function (resume) {
                        if (resume) {
                            responseHtml(res, resume);
                        } else {
                            res.send('File not found');
                        }
                    });
                } else {
                    return res.status(404).render('404');
                }
            }
        })
    }

    /**
     * render view resume page
     * @param id of resume
     */
     this.getPreviewResume = function (req, res) {
        connection.pool.query(sql.getTemplates, function (err, temp_rows) {
            if (err) {
                throw err.stack
            } else {
                connection.pool.query("SELECT id, userId FROM resume WHERE id = ?", req.params.id, function (err, res_rows) {
                    if (err) {
                        throw err.stack;
                        res.status(500).render('500');
                    } else {
                        if (!res_rows.length 
                            || req.user.id != res_rows[0].userId 
                            && req.user.role == 'user') {
                            res.status(404).render('404');
                    } else if (req.user.id == res_rows[0].userId) {
                        res.render('resume/preview', {
                            title: 'View resume',
                            resumeId: res_rows[0].id,
                            templates: temp_rows,
                            req: req,
                            message: req.flash('')
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
        var tables = ['resume', 'education', 'skill', 'project', 'experience', 'certification'];
        if ( tables.indexOf(req.body.table) != -1 ) {
            var value = req.body.value;
            if (req.body.table == 'resume') {
                if(req.body.field == 'publicLink'){
                    if (req.body.value == 'true') {
                        var Guid = require('guid');
                        value = Guid.create().value;
                    } else {
                        value = null;
                    }
                } 
                var query = sql.checkResumeEditable;
                var params = [req.body.id, req.user.id];
            } else {
                var query = sql.checkResumeDataEditable;
                var params = [req.body.table, req.body.id, req.user.id];
            }
            connection.pool.query(query, params, function (err, row) {
                if (err) {
                    res.status(400).send("You cannot edit resume");
                    throw err;
                } else if (row.length) {
                    console.log('row', row);
                    connection.pool.query("UPDATE ?? SET ?? = ? WHERE id = ?",
                        [req.body.table, req.body.field, value, req.body.id],
                        function (err, result) {
                            if (err) {
                                res.status(400).send("Item not updated");
                                throw err;
                            } else {
                                if (req.body.field == 'publicLink' && value!= null) {
                                    value = req.headers.origin + '/resumes/public/'+ req.body.id + '/' + value ;
                                }
                                res.status(200).send({value: value, message:"Item updated"});
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
                    if (row[0] && row[0].id) {
                        connection.pool.query("CALL udsp_deleteResume(?)", req.params.id, function (err, result) {
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
        ejs.renderFile('./views/cv-template/skeleton-'+resume.templateId+'.ejs', { resume: resume }, null, function (err, html) {
            if (err) {
                throw err.stack;
            } else if (resume) {
                var pdf = require('html-pdf');
                var options = require('../config/cv-pdf.js');
                options.base = 'http://' + req.headers.host;
                pdf.create(html, options).toStream(function (err, data) {
                    if (err) {
                        throw err.stack;
                    } else {
                        res.setHeader("content-type", "application/pdf");
                        res.setHeader("content-disposition", "inline; filename=resume.pdf");

                        data.pipe(res);
                    }
                });
            } else {
                res.headers(404);
                res.render('404');
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
            res.render('cv-template/skeleton-'+resume.templateId, { resume: resume });
        } else {
            res.headers(404);
            res.render('404');
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
                if (rows[0][0]) {
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
                    resume.experiences = expertiences;

                    // projects
                    var projects = [];
                    for (var i = 0; i < rows[4].length; i++) {
                        projects[i] = new projectModel(rows[4][i]);
                    };
                    resume.projects = projects;

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
