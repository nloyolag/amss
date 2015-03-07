/*
===============================
=           Created           =
===============================
*/

Template.dashboardSettings.created = function () {
	
};

/*
===============================
=            Forms            =
===============================
*/

AutoForm.hooks({
	editProfileForm: {

		before: {
			editProfile: function(doc, template) {

			}
		},

		after: {
			editProfile: function(error, result, template) {

			}
		}

	}
});

/*
===============================
=           Helpers           =
===============================
*/

Template.dashboardSettings.helpers({
	editProfileSchema: function() {
		return Schema.editProfile;
	}
});

/*
===============================
=           Events            =
===============================
*/