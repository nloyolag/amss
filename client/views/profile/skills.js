/*
===============================
=           Created           =
===============================
*/
Template.skills.created = function() {
	var username = Router.current().params.username;
	Session.set("currentProfileUsername", username);
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
Template.skills.helpers({
	userSkills: function() {
		return Meteor.users.findOne({
			username: Session.get("currentProfileUsername")
		}).profile.skills;
	}

});
/*
===============================
=           Events            =
===============================
*/