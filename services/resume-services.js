module.exports = {
    getTemplates: "SELECT id, name FROM template",
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
    FROM project WHERE resId = ? ",
    insertResume: "INSERT INTO resume SET ?",
    insertEducation: "INSERT INTO education SET ?",
    insertExperience: "INSERT INTO experience SET ?",
    insertCertification: "INSERT INTO certification SET ?",
    insertProject: "INSERT INTO project SET ?",
    insertSkill: "INSERT INTO skill SET ?",
    updateResume: "UPDATE resume SET ? WHERE id = ?",
    checkResumeDataEditable: "SELECT T.id FROM ? AS T, resume AS R where T.id = ? AND T.resId = R.id AND R.userId = ? ",
    checkResumeEditable: "SELECT id FROM resume WHERE id = ? AND userId = ?",
    updatePublicLink: "UPDATE resume SET publicLink = ? WHERE id = ? and publicLink == NULL"
};