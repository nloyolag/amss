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
Template.dashboardSettings.events({
'click #deactivateUser': function(){
    var id = Meteor.userId();
    Meteor.call("deleteUser", id);
    Meteor.logout(function(error) {
        if (!error) {
            Router.go('login');
        }
    });
}});