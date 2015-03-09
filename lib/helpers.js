Meteor.helpers = {

	/*
    ===================================================
    =  Helper Method getSkills                        =
    =                                                 =
    =  Arguments: None                                =
    =                                                 =
    =  Returns: Array of Objects (Skills)             =
    =           label and value keys used for         =
    =           select html field                     =
    =                                                 =
    =  Description: Method that obtains skills from   =
    =  DB and adds them to an array as objects        =
    =                                                 =
    =  Used By: lib/forms.js                          =
    =           createUser form                       =
    =           editUser form                         =
    ===================================================
    */

	getSkills: function() {
		var skills = [];
		var skillsQuery = Skills.find();

		skillsQuery.forEach(function(skill) {
			skills.push({
				label: skill.skillName,
				value: skill.skillName
			});
		});

		return skills;
	}

}