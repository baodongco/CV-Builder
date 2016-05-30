function skillModel(skill) {
	this.resId = skill.resId,
	this.name = skill.name,
	this.expertise = skill.expertise,
	this.experience = skill.experience,
	this.lastUsed = skill.lastUsed
}

module.exports = skillModel;