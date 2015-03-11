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
    },

    pendingReview: function() {
    	if (this.isEmployee) {
    		if (this.task.employeeStatus === "Pending Review") 
    			return true;
    	} else {
    		if (this.task.employerStatus === "Pending Review") 
    			return true;
    	}
    	return false;
    },

    checkReview: function() {
        event.preventDefault();
        $('#view-review').openModal();
    }

});

/*
===============================
=           Events            =
===============================
*/

Template.task.events({

	'click #do-review': function(event) {

		event.preventDefault();
		$('#create-review').openModal();
        Session.set("reviewTaskId", this.task._id);
        Session.set("reviewToId", this.task.employee);
	},

    'click #check-review': function(event) {

        event.preventDefault();
        Session.set("reviewTaskId", this.task._id);
        Session.set("reviewToId", this.task.employee);
        $('#view-review').openModal();

    }


});