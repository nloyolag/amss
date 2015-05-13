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

	editProfile: function(id, name, username, email, userTitle, bio, location, skills) {

	    var user = Meteor.users.findOne({
	            _id: Meteor.userId()
	    }); 

        if (Meteor.users.findOne({ "emails.address" : email }) && email != (user.emails[0].address)) {
            throw new Meteor.Error(400, 'Email already exists.');
        }

        if (Meteor.users.findOne({ "username" : username }) && username != user.username) {
            throw new Meteor.Error(400, 'Username already exists.');
        }

        console.log(id);

        Meteor.users.update({_id: id}, {$set: {username: username, "profile.name": name, "emails.0.address": email, "profile.userTitle": userTitle, "profile.bio": bio, "profile.location": location}});
        //Users.update({_id: id}, {$set: {usename: usename}, {"profile.name": name}, {"emails[0].address": email}, {"profile.userTitle": userTitle}, {"profile.bio": bio}, {"profile.location": location}})
        for (var i in skills) {
        	Meteor.users.update({_id: id}, { $push: { "profile.skills": skills[i] } });
		}
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
