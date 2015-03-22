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

					var task = Tasks.findOne(result);

					var replacements = {
						"%FROM%": Meteor.user().username,
						"%TASK%": task.name
					}
					var notificationTitle = START_TASK_NOTIFICATION;

					notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
						return replacements[all] || all;
					});

					Meteor.call(
						"createNotification",
						notificationTitle,
						Meteor.userId(),
						Session.get('currentProfileId'),
						true,
						START_TASK,
						task._id
					);
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
