/*
===============================
=           Created           =
===============================
*/
Template.reviews.created = function() {
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
Template.reviews.helpers({
	userReviews: function() {
		return Reviews.find({to: Session.get("currentProfileId")});
	}

});
/*
===============================
=           Events            =
===============================
*/