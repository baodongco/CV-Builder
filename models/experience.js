function experienceModel(experience) {
	this.resId = experience.resId;
	this.company = experience.company;
	this.designation = experience.designation;
	this.startTime = experience.startTime;
	this.endTime = experience.endTime;
	this.detail = experience.detail;
}

module.exports = experienceModel;
