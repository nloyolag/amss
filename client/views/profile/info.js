/*
===============================
=           Created           =
===============================
*/

Template.profileInfo.created = function() {
	var tasks = Tasks.find({
		employer: Meteor.userId(),
		employee: Session.get("currentProfileId"),
		employerStatus: 'On going'
	}).fetch();

	if (tasks.length > 0) {
		Session.set("hasActiveTask", true);
	} else {
		Session.set("hasActiveTask", false);
	}

};

/*
===============================
=           Helpers           =
===============================
*/

Template.profileInfo.helpers({

	hasActiveTask: function() {
		return Session.get("hasActiveTask");
	},

	profileUser: function() {
		return Meteor.users.findOne({
			username: Session.get("currentProfileUsername")
		});
	},

	completedTasks: function() {
		return Tasks.find(
		{$and : [
		{employee: Session.get("currentProfileId")},
		{employeeStatus: "Done"}
		]}).count();
	},

	positiveReviews: function() {
		var totalReviews =  Reviews.find({
			to: Session.get("currentProfileId")
		}).count();

		var positiveReviews = Reviews.find(
		{$and : [
			{to: Session.get("currentProfileId")},
			{$or : [
				{score: 4},
				{score: 5}
			]}
		]
		}).count();
		if(totalReviews == 0) {
			return 0;
		} else {
			return positiveReviews/totalReviews.toFixed(2) * 100;
		}
	}

});


/*
===============================
=           Events            =
===============================
*/

Template.profileInfo.events({

    "click #task-me": function(event) {
    	event.preventDefault();
    	$('#create-task').openModal();
 		      
    },

    "click #message-me": function(event) {
    	event.preventDefault();
    	$('#create-chat').openModal();
    }

});
