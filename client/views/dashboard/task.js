/*
===============================
=           Helpers           =
===============================
*/

Template.task.helpers({
    
    taskEmployer: function() {
    	return Meteor.users.findOne(this.task.employer).profile.name;
    },

    taskEmployee: function() {
    	return Meteor.users.findOne(this.task.employee).profile.name;
    }

});