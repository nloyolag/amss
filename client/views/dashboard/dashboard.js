/*
===============================
=           Created           =
===============================
*/

Template.dashboard.created = function() {
	var skills = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.skills;

	var taskNum = Tasks.find({
		employee: Meteor.userId()
	}).count();

	var completedTasks = Tasks.find(
	{$and : [
	{employee: Meteor.userId()},
	{employeeStatus: "Done"}
	]}
	).count();

	console.log(taskNum);
	console.log(completedTasks);
	var skillsNum = 0;
	var evidenceNum = 0;
	var validationNum = 0;
	var evidences = [];
	var validations = [];

	for(var p in skills) {
		if(skills.hasOwnProperty(p)) 
			skillsNum++;
		if(skills[p].evidences.length > 0)
			evidences.push(skills[p].evidences);
		if(skills[p].validations.length > 0)
			validations.push(skills[p].validations);
	};

	evidenceNum = evidences.length;
	validationNum = validations.length;

	if(evidenceNum > skillsNum / 2) {
		Meteor.call("addMerit", Meteor.userId(), "CertifiedTasker");
	}

	if(validationNum > skillsNum / 2) {
		Meteor.call("addMerit", Meteor.userId(), "NotoriousTasker")
	}

	if(completedTasks > taskNum / 2) {
		Meteor.call("addMerit", Meteor.userId(), "CommittedTasker");
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