/*
===============================
=           Helpers           =
===============================
*/

Template.dashboardModals.helpers({
    
    reviewTo: function() {
    	return Reviews.findOne({task: Session.get("reviewTaskId")}).title;
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
					Tasks.update(taskId, {$set: {employerStatus: "Done"}});
					Tasks.update(taskId, {$set: {employeeStatus: "Done"}});
				}			
			}

		}

	}

});