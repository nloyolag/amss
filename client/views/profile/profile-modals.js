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

	},

	createMessageForm: {

		onSubmit: function(insertDoc, updateDoc, currentDoc) {

			event.preventDefault();

			var message = insertDoc.message;
			var participantsArr = [];
			var from = Meteor.userId();
			var to = Session.get("currentProfileId");
			participantsArr.push(from);
			participantsArr.push(to);
			
			var chat = Chats.findOne({ 'participants': { $all: participantsArr }});

			if (chat) {

				var messageObj = {
					date: new Date(),
					from: from,
					to: to,
					message: message
				}
				Meteor.call("addMessageToChat", messageObj, chat._id);

			} else {

				var messageArr = [];
				messageArr.push({
					date: new Date(),
					from: from,
					to: to,
					message: message
				});
				Meteor.call("createChat", participantsArr, messageArr);

			}

			$('#create-chat').closeModal();
			alertify.success("The message was sent succesfully");
			this.done();
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
	},

	createMessageSchema: function() {
		return Schema.createMessage;
	}


});
