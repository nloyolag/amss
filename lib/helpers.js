Meteor.helpers = {

	getSkills: function() {
		var skills = [];
		var skillsQuery = Skills.find();

		skillsQuery.forEach(function(skill) {
			skills.push({
				label: skill.skillName,
				value: skill.skillName
			});
		});

		console.log(skills);
		console.log(skillsQuery);

		return skills;
	}

}