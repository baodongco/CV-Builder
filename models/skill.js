function skillModel(skill) {
	this.id=skill.id,
	this.resId = skill.resId,
	this.name = skill.name,
	this.expertise = skill.expertise,
	this.experience = skill.experience,
	this.lastUsed = skill.lastUsed
}

module.exports = skillModel;
