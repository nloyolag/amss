Meteor.methods({

    /*
    ===================================================
    =  Server Method createTask                       =
    =                                                 =
    =  Arguments: Autoform Doc                        =
    =                                                 =
    =  Returns: Task ID                               =
    =                                                 =
    =  Description: Method that creates a task.       =
    =  The employee gets a Confirmation status for    =
    =  him to accept or reject the task               =
    =                                                 =
    =  Used By: views/profile/info.js                 =
    =           views/profile/info.html               =
    ===================================================
    */

	createTask: function(doc) {
		Schema.createTask.clean(doc);
		check(doc, Schema.createTask);

        var result = Tasks.insert({
            name: doc.name,
            description: doc.description,
            employer: doc.employer,
            employee: doc.employee,
            employerStatus: 'On going',
            employeeStatus: 'Confirmation',
            startDate: new Date()
        });

        return result;
	},

    /*
    ===================================================
    =  Server Method validateSkill                    =
    =                                                 =
    =  Arguments: Skill Name: String                  =
    =             Validator Id: userId                =
    =             profileUser: user object            =
    =                                                 =
    =  Returns:                                       =
    =                                                 =
    =  Description: Method that validates a skill     =
    =  based on the logged in user Id                 =
    =                                                 =
    =  Used By: views/profile/skill.js                =
    =           views/profile/skill.html              =
    ===================================================
    */

    validateSkill: function(skillName, validatorId, profileUser) {

        Meteor.users.update(
        {
            _id: profileUser._id,
            "profile.skills.name": skillName
        }, 
        {
            $push: { "profile.skills.$.validations": validatorId }
        });

    }

});