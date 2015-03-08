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
        return Session.get("userTasksEmployer");
    },

    userTasksEmployee: function() {
        return Session.get("userTasksEmployee");
    }

});

/*
===============================
=           Events            =
===============================
*/
