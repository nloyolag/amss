/*
===============================
=           Created           =
===============================
*/

Template.dashboardSettings.created = function() {

};

/*
===============================
=           Rendered          =
===============================
*/

Template.dashboardSettings.rendered = function() {
    $(document).ready(function() {
        $('select').material_select();
    });
}

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
