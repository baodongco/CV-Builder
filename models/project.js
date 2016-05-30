function Project(obj) {
    this.id 		= obj.id;
    this.title 		= obj.title;
    this.url 		= obj.url;
    this.startTime 	= obj.startTime;
    this.endTime	= obj.endTime;
    this.detail 	= obj.detail;
    this.resId 		= obj.resId;
}

module.exports = Project;