/*
===============================
=           Helpers           =
===============================
*/

Template.dashboardModals.helpers({
    
    review: function() {
    	return Reviews.findOne({task: Session.get("reviewTaskId")});
    },

    notificationTask: function() {
    	return Tasks.findOne({_id: Session.get("notificationTaskId")});
    },

    notificationTaskEmployer: function() {
    	var task = Tasks.findOne({_id: Session.get("notificationTaskId")});
    	if (task) 
    		return Meteor.users.findOne({_id: task.employer});
    }

});

/*
===============================
=            Forms            =
===============================
*/

AutoForm.hooks({

	createReviewForm: {

		before: {

			insert: function(doc) {
				doc.task = Session.get("reviewTaskId");
				doc.to = Session.get("reviewToId");
				doc.from = Meteor.userId();
				return doc;
			}

		},

		after: {

			insert: function(error, result) {
				if (!error) {
					$('#create-review').closeModal();
					alertify.success("The review was created succesfully");
					var taskId = Session.get("reviewTaskId");
					Meteor.call("updateTaskStatus", taskId, DONE, DONE);

					var review = Reviews.findOne(result);

					var replacements = {
						"%FROM%": Meteor.user().username,
						"%TITLE%": review.title,
						"%SCORE%": review.score
					}
					var notificationTitle = REVIEW_DONE_NOTIFICATION;

					notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
						return replacements[all] || all;
					})

					Meteor.call("createNotification",
						notificationTitle,
						Meteor.userId(),
						Session.get('reviewToId'),
						true,
						REVIEW_DONE,
						taskId
					);
				}			
			}

		}

	}

});