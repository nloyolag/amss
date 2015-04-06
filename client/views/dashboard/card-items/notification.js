/*
===============================
=           Helpers           =
===============================
*/

Template.notification.helpers({
    
    fromPhoto: function() {
        return Meteor.users.findOne(this.from).profile.img;
    },

    isStartTask: function() {
    	if (this.type === START_TASK) {
    		return true;
    	} else {
    		return false;
    	}
    },

    isReviewDone: function() {
    	if (this.type === REVIEW_DONE) {
    		return true;
    	} else {
    		return false;
    	}
    },

    isTaskRejected: function() {
    	if (this.type === TASK_REJECTED) {
    		return true;
    	} else {
    		return false;
    	}
    },

    isTaskAccepted: function() {
    	if (this.type === TASK_ACCEPTED) {
    		return true;
    	} else {
    		return false;
    	}
    },

    isOtherCompleted: function() {
    	if (this.type === OTHER_COMPLETED) {
    		return true;
    	} else {
    		return false;
    	}
    },

    isBothCompletedEmployer: function() {
    	if (this.type === BOTH_COMPLETED_EMPLOYER) {
    		return true;
    	} else {
    		return false;
    	}
    },

    isBothCompletedEmployee: function() {
    	if (this.type === BOTH_COMPLETED_EMPLOYEE) {
    		return true;
    	} else {
    		return false;
    	}
    },

    isReceivedMessage: function() {
    	if (this.type === RECEIVED_MESSAGE) {
    		return true;
    	} else {
    		return false;
    	}
    } 

});

/*
===============================
=            Events           =
===============================
*/

Template.notification.events({

	"click .show-task-description": function() {
		Session.set("notificationTaskId", this.task);
		$('#view-notification-task').openModal();
	},

	"click .confirm-start-task": function() {

		Meteor.call("dismissNotification", this._id);
		alertify.success(TASK_CONFIRMED);

		var task = Tasks.findOne({_id: this.task});

		var replacements = {
			"%FROM%": Meteor.user().username,
			"%TASK%": task.name
		}

		var notificationTitle = TASK_ACCEPTED_NOTIFICATION;

		notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
			return replacements[all] || all;
		})

		Meteor.call("createNotification",
			notificationTitle,
			Meteor.userId(),
			this.from,
			true,
			TASK_ACCEPTED,
			this.task
		);

		Meteor.call(
			"updateTaskStatus",
			 this.task,
			 ON_GOING,
			 ON_GOING
		);
	
	},

	"click .dismiss-start-task": function() {
		var currentNotification = this;
		alertify.confirm(SURE_REJECT_TASK)
            .set('onok', function() {

                Meteor.call("dismissNotification", currentNotification._id);

                var replacements = {
					"%FROM%": Meteor.user().username
				}

				var notificationTitle = TASK_REJECTED_NOTIFICATION;

				notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
					return replacements[all] || all;
				})

				Meteor.call("createNotification",
					notificationTitle,
					Meteor.userId(),
					currentNotification.from,
					true,
					TASK_REJECTED,
					currentNotification.task
				);

				Meteor.call(
					"updateTaskStatus",
					 currentNotification.task,
					 CANCELLED,
					 CANCELLED
				);

            })
            .set('labels', {ok:'Accept', cancel:'Cancel'});
	},

	"click .dismiss-notification": function() {
		Meteor.call("dismissNotification", this._id);
	},

	"click .complete-task-other": function() {
		var currentNotification = this;
		alertify.confirm(SURE_COMPLETE_TASK)
            .set('onok', function() {
            	Meteor.call("dismissNotification", currentNotification._id);

            	var currentTask = Tasks.findOne({_id: currentNotification.task});

				var replacements = {
		            "%OTHER%": Meteor.user().username,
		            "%TASK%": currentTask.name
		        }

		        if (Meteor.userId() === currentTask.employer) {

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

		        } else if (Meteor.userId() === currentTask.employee) {

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
            })
            .set('labels', {ok:'Accept', cancel:'Cancel'});
		
	},

	'click .check-review': function(event) {

        event.preventDefault();
        var task = Tasks.findOne({_id: this.task});
        Session.set("reviewTaskId", task._id);
        Session.set("reviewToId", task.employee);
        $('#view-review').openModal();
    },

    'click .do-review': function(event) {

		event.preventDefault();
		var task = Tasks.findOne({_id: this.task});
		$('#create-review').openModal();
        Session.set("reviewTaskId", task._id);
        Session.set("reviewToId", task.employee);
        Meteor.call("dismissNotification", this._id);
	},

});