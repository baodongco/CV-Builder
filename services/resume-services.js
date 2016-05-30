module.exports = {
	getResumeById: "SELECT id, userId, templateId, firstName, lastName, email, phone, website,\
        address, sumHeadline, sumContent, photoUrl, publicLink \
        FROM resume WHERE id = ? ",
	getResumesByUserId: "SELECT userId, id, templateId, firstName, lastName, email, phone, website,\
		address, sumHeadline, sumContent, photoUrl, publicLink\
		FROM resume WHERE userId = ? ",
    getEducationsByResumeId: "SELECT resId, id, institute, degree, startTime, endTime, detail \
    	FROM education WHERE resId = ? ",
    getSkillsByResumeId: "SELECT resId, id, name, expertise, experience, lastUsed FROM skill WHERE resId = ?",
    getExperiencesByResumeId: "SELECT resId, id, company, designation, startTime, endTime, detail \
    FROM experience WHERE resId = ? ",
    getCertificationsByResumeId: "SELECT resId, id, title, authority, date, detail \
    FROM certification WHERE resId = ? ",
    getProjectsByResumeId: "SELECT resId, id, title, startTime, endTime, detail \
    FROM project WHERE resId = ? "    
};