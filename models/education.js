function educationModel(education) {
	this.id=education.id,
	this.resId = education.resId,
	this.institute = education.institute,
	this.degree = education.degree,
	this.startTime = education.startTime,
	this.endTime = education.endTime,
	this.detail = education.detail
};

module.exports = educationModel;
