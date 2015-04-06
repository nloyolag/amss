/*
===============================
=           Created           =
===============================
*/

Template.profileBio.created = function() {

};

/*
===============================
=           Helpers           =
===============================
*/

Template.profileBio.helpers({
	profileUser: function() {
		return Meteor.users.findOne({
			username: Session.get("currentProfileUsername")
		});
	}
});