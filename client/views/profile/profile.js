/*
===============================
=           Created           =
===============================
*/

Template.profile.created = function() {
	var username = Router.current().params.username;
	Session.set("currentProfileUsername", username);
	var user = Meteor.users.findOne({username: username});
	Session.set("currentProfileId", user._id);
};

/*
===============================
=            Forms            =
===============================
*/

/*
===============================
=           Helpers           =
===============================
*/

Template.profile.helpers({

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
