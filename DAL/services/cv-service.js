var resumeModel = require('../../models/resume');

module.exports = function (resRepo, eduRepo, expRepo, cerRepo, proRepo, skiRepo) {
	this.insertResume = function (body, callback) {
		var resume = new resumeModel(body);
		resume.templateId = 1;
		resume.userId = body.userId
		resRepo.create(resume, function (result) {
			var resId = result.insertId;			

			if (body.education !== undefined) {
				body.education.forEach(function (item) {
	                if (checkObject(item)) {
	                    console.log('education hit');
	                    console.log(item);
	                    item.resId = resId;
	                    eduRepo.create(item);
	                }
	            });				
			}			

			if (body.experience !== undefined) {
	            body.experience.forEach(function (item) {
	                if (checkObject(item)) {
	                    console.log('experience hit');
	                    console.log(item);
	                    item.resId = resId;
	                    expuRepo.create(item);
	                }
	            });				
			}

			if (body.certification !== undefined) {
	            body.certification.forEach(function (item) {
	                if (checkObject(item)) {
	                    console.log('certification hit');
	                    console.log(item);
	                    item.resId = resId;
	                    cerRepo.create(item);
	            	}
	            });				
			}

			if (body.project !== undefined) {
	            body.project.forEach(function (item) {
	                if (checkObject(item)) {
	                    console.log('project hit');
	                    console.log(item);
	                    item.resId = resId;
	                    proRepo.create(item);
	                }
	            });				
			}

			if (body.skill !== undefined) {
	            body.skill.forEach(function (item) {
	                if (checkObject(item)) {
	                    console.log('skill hit');
	                    console.log(item);
	                    item.resId = resId;
	                    expuRepo.create(item);
	                }
	            });				
			}

			callback(resId);
		});
	};

	this.updateResume = function (resume, callback) {
		resRepo.update(resume, function (result) {

		});
	};

	function checkObject(obj) {
        for (var key in obj) {
            if (obj[key] == '') {
                return false;
            }
        }
        return true;
    };
}