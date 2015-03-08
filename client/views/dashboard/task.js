/*
===============================
=           Helpers           =
===============================
*/

Template.task.helpers({
    
    taskEmployer: function() {
    	return Meteor.users.findOne(this.employer).profile.name;
    },

    taskEmployee: function() {
    	return Meteor.users.findOne(this.employee).profile.name;
    }

});