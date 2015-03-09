/*
===============================
=            Forms            =
===============================
*/

AutoForm.hooks({

	createTaskForm: {

		before: {

			createTask: function(doc, template) {
				doc.employer = Meteor.userId();
				doc.employee = Session.get('currentProfileId');
				return doc;
			}

		},

		after: {

			createTask: function(error, result, template) {
				if (!error) {
					$('#create-task').closeModal();
					alertify.success("The task was created succesfully");
					Session.set("hasActiveTask", true);
				}			
			}

		}

	}

});

/*
===============================
=           Helpers           =
===============================
*/

Template.profileModals.helpers({
	createTaskSchema: function() {
		return Schema.createTask;
	}
});
