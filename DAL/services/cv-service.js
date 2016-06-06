module.exports = function (repo) {
	this.insertResume = function (resume, callback) {
		repo.create(resume, function (result) {
			callback(result);
		});
	};

	this.updateResume = function (resume, callback) {
		repo.create(resume, function (result) {
			callback(result);
		});
	};
}
