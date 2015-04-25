/*
===============================
=           Created           =
===============================
*/

Template.dashboardTasks.created = function() {
    Session.set("userTasksEmployer", Tasks.find({
        employer: Meteor.userId()
    }).fetch());
    Session.set("userTasksEmployee", Tasks.find({
        employee: Meteor.userId()
    }).fetch());
};


/*
===============================
=            Forms            =
===============================
*/

AutoForm.hooks({
    /*editProfileForm: {

        before: {
            editProfile: function(doc, template) {

            }
        },

        after: {
            editProfile: function(error, result, template) {

            }
        }

    }*/
});

/*
===============================
=           Helpers           =
===============================
*/

Template.dashboardTasks.helpers({
    
    userTasksEmployer: function() {
        return Tasks.find({employer: Meteor.userId()}).fetch();
    },

    userTasksEmployee: function() {
        return Tasks.find({employee: Meteor.userId()}).fetch();
    }

});

/*
===============================
=           Events            =
===============================
*/
