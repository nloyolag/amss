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
