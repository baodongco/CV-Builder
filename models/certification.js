function certificationModel(certification) {
	this.resId = certification.resId,
	this.title = certification.title,
	this.authority = certification.authority,
	this.date = certification.date,
	this.detail = certification.detail	
};

module.exports = certificationModel;
