function certificationModel(certification) {
	this.id=certification.id,
	this.resId = certification.resId,
	this.title = certification.title,
	this.authority = certification.authority,
	this.date = certification.date,
	this.detail = certification.detail	
};

module.exports = certificationModel;
