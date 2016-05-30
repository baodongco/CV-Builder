function projectModel(project) {
	this.resId = project.resId,
	this.title = project.title,
	this.url = project.url,
	this.startTime = project.startTime,
	this.endTime = project.endTime,
	this.detail = project.detail
};

module.exports = projectModel;