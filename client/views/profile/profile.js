/*
===============================
=           Created           =
===============================
*/


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

Template.profileInfo.helpers({

	profileUser: function() {
		return Meteor.users.findOne({
			username: Router.current().params.username
		});
	}

});

/*
===============================
=           Events            =
===============================
*/
