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
    },

    'click #complete-task': function(event) {

        event.preventDefault();

        var currentTask = this.task;
        console.l
        alertify.confirm(SURE_COMPLETE_TASK)
            .set('onok', function() {

                // Check for 4 types of completion notification

                if (currentTask.employer === Meteor.userId()) {

                    // Case 1: Employer first to complete
                    if (currentTask.employerStatus === ON_GOING &&
                        currentTask.employeeStatus === ON_GOING) {

                        var replacements = {
                            "%OTHER%": Meteor.user().username,
                            "%TASK%": currentTask.name
                        }

                        var notificationTitle = OTHER_COMPLETED_NOTIFICATION;

                        notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
                            return replacements[all] || all;
                        })

                        Meteor.call("createNotification",
                            notificationTitle,
                            Meteor.userId(),
                            currentTask.employee,
                            true,
                            OTHER_COMPLETED,
                            currentTask._id
                        );

                        Meteor.call(
                            "updateTaskStatus",
                             currentTask._id,
                             PENDING_COMPLETION,
                             ON_GOING
                        );

                        alertify.success(TASK_COMPLETED_FIRST);

                    // Case 2: Employee completed beforehand
                    } else if (currentTask.employerStatus === ON_GOING &&
                        currentTask.employeeStatus === PENDING_COMPLETION) {

                        var replacements = {
                            "%OTHER%": Meteor.user().username,
                            "%TASK%": currentTask.name
                        }

                        var notificationTitle = BOTH_COMPLETED_EMPLOYEE_NOTIFICATION;

                        notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
                            return replacements[all] || all;
                        })

                        Meteor.call("createNotification",
                            notificationTitle,
                            Meteor.userId(),
                            currentTask.employee,
                            true,
                            BOTH_COMPLETED_EMPLOYEE,
                            currentTask._id
                        );

                        Meteor.call(
                            "updateTaskStatus",
                             currentTask._id,
                             PENDING_REVIEW,
                             PENDING_REVIEW
                        );

                        alertify.success(TASK_COMPLETED_LAST_EMPLOYER);

                    }

                } else if (currentTask.employee === Meteor.userId()) {

                    // Case 3: Employee first to complete
                    if (currentTask.employeeStatus === ON_GOING &&
                        currentTask.employerStatus === ON_GOING) {

                        var replacements = {
                            "%OTHER%": Meteor.user().username,
                            "%TASK%": currentTask.name
                        }

                        var notificationTitle = OTHER_COMPLETED_NOTIFICATION;

                        notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
                            return replacements[all] || all;
                        })

                        Meteor.call("createNotification",
                            notificationTitle,
                            Meteor.userId(),
                            currentTask.employer,
                            true,
                            OTHER_COMPLETED,
                            currentTask._id
                        );

                        Meteor.call(
                            "updateTaskStatus",
                             currentTask._id,
                             ON_GOING,
                             PENDING_COMPLETION
                        );

                        alertify.success(TASK_COMPLETED_FIRST);

                    // Case 4: Employer completed beforehand
                    } else if (currentTask.employeeStatus === ON_GOING &&
                        currentTask.employerStatus === PENDING_COMPLETION) {

                        var replacements = {
                            "%OTHER%": Meteor.user().username,
                            "%TASK%": currentTask.name
                        }

                        var notificationTitle = BOTH_COMPLETED_EMPLOYER_NOTIFICATION;

                        notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
                            return replacements[all] || all;
                        })

                        Meteor.call("createNotification",
                            notificationTitle,
                            Meteor.userId(),
                            currentTask.employer,
                            true,
                            BOTH_COMPLETED_EMPLOYER,
                            currentTask._id
                        );

                        Meteor.call(
                            "updateTaskStatus",
                             currentTask._id,
                             PENDING_REVIEW,
                             PENDING_REVIEW
                        );

                        alertify.success(TASK_COMPLETED_LAST_EMPLOYEE);

                    }

                }

            })
            .set('labels', {ok:'Accept', cancel:'Cancel'});

    }


});