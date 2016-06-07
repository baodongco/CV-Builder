function resumeModel(body) {
    this.id = body.id,
        this.title = body.title,
        this.userId = body.userId,
        this.firstName = body.firstName,
        this.lastName = body.lastName,
        this.email = body.email,
        this.phone = body.phone,
        this.website = body.website,
        this.address = body.address,
        this.sumHeadline = body.sumHeadline,
        this.sumContent = body.sumContent,
        this.photoUrl = body.photoUrl,
        this.publicLink = body.publicLink,
        this.templateId = body.templateId
};
module.exports = resumeModel;
