Meteor.methods({

	/*
	====================================================
	=  Server Method editProfile                       =
	=                                                  =
	=  Arguments: Autoform Doc                         =
	=                                                  =
	=  Returns:                                        =
	=                                                  =
	=  Description: Method that edits a user profile   =
	=                                                  =
	=  Used By: views/dashboard/dashboard-settings.js  =
	=           views/dashboard/dashboard-settings.html=
	====================================================
	*/

	editProfile: function(doc) {
		// Validate that username and email are unique
		// Edit fields that are different
		// Add new skills to DB and update user skills
	},

	/*
	====================================================
	=  Server Method updateTaskStatus                  =
	=                                                  =
	=  Arguments: Task ID: taskId                      =
	=             Employer Status: String              =
	=             Employee Status: String              =
	=                                                  =
	=  Description: Method that updates task status    =
	=                                                  =
	=  Used By: views/dashboard/dashboard-modals.js    =
	====================================================
	*/

	updateTaskStatus: function(taskId, employerStatus, employeeStatus) {
		Tasks.update(taskId, {$set: {employerStatus: employerStatus}});
		Tasks.update(taskId, {$set: {employeeStatus: employeeStatus}});
	},

	assignMerit: function(userId, merit) {

        Meteor.users.update(
        {
            _id: userId,
            "profile.merits.name": merit
        }, 
        {
            $set: { "profile.merits.$.active": 1 }
        });
	},

	unassignMerit: function(userId, merit) {

        Meteor.users.update(
        {
            _id: userId,
            "profile.merits.name": merit
        }, 
        {
            $set: { "profile.merits.$.active": 0 }
        });
	},

	deleteUser: function(userId) {
		Meteor.users.update(
		{
			_id: userId
		},
		{
			$set: { "profile.active": false }
		});
	},

	activateUser: function(userId) {
		Meteor.users.update(
		{
			_id: userId
		},
		{
			$set: { "profile.active": true }
		});		
	}


});