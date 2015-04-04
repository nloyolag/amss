/*
===============================
=           Created           =
===============================
*/

Template.dashboard.created = function() {
	var skills = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.skills;

	var skillsNum = 0;
	var evidenceNum = 0;
	var evidences = [];

	for(var p in skills) {
		if(skills.hasOwnProperty(p)) 
			skillsNum++;
		if(skills[p].evidences.length > 0)
			evidences.push(skills[p].evidences);
	};

	evidenceNum = evidences.length;
	console.log(skillsNum);
	console.log(evidenceNum);

	if(evidenceNum > skillsNum / 2) {
		Meteor.call("addMerit", Meteor.userId(), "CertifiedTasker");
	}
};

/*
===============================
=           Helpers           =
===============================
*/

Template.dashboard.helpers({
	getSkillsNumber: function() {
		return Meteor.users.findOne({
			username: Session.get("currentProfileUsername")
		}).profile.skills.length;
	},

	getEvidencedSkillsNumber: function(skills) {
		var cont = 0;

		for(var skill in skills) {
			if(skill.evidence.length > 0) {
				cont++;
			}
		}

		return cont;
	}
});