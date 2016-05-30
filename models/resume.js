function Resume(obj) {
    this.id 			= obj.id;
    this.email 			= obj.email;
    this.firstName 		= obj.firstName;
    this.lastName 		= obj.lastName;
    this.phone			= obj.phone;
    this.website 		= obj.website;
    this.address 		= obj.address;
    this.sumHeadline 	= obj.sumHeadline;
    this.sumContent 	= obj.sumContent;
    this.photoUrl 		= obj.photoUrl;
    this.publicLink 	= obj.publicLink;
    this.userId 		= obj.userId;
    this.templateId 	= obj.templateId;
}

module.exports = Resume;