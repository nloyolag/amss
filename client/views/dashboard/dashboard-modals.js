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
    },

    chatPhoto: function() {
    	var chat = Chats.findOne(Session.get("openChatId"));

    	if (chat) {
    		var userId = Meteor.userId();
			var message = chat.messages[0];
			var otherUserId;

			if (message.from === userId) {
				otherUserId = message.to;
			} else {
				otherUserId = message.from;
			}

			return Meteor.users.findOne(otherUserId).profile.img;
    	}

	},

	chatUserName: function() {
		var chat = Chats.findOne(Session.get("openChatId"));

		if (chat) {
			var userId = Meteor.userId();
			var message = chat.messages[0];
			var otherUserId;

			if (message.from === userId) {
				otherUserId = message.to;
			} else {
				otherUserId = message.from;
			}

			return Meteor.users.findOne(otherUserId).profile.name;
		}
		
	},

	chatMessages: function() {
		var chat = Chats.findOne(Session.get("openChatId"));

		if (chat) {
			return chat.messages;
		}	
	},

	createMessageSchema: function() {
		return Schema.createMessage;
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

	},

	createMessageModalForm: {

		onSubmit: function(insertDoc, updateDoc, currentDoc) {

			event.preventDefault();
			
			var chat = Chats.findOne(Session.get("openChatId"));
			var message = insertDoc.message;
			var from = Meteor.userId();
			var to;
			var participants = chat.participants;

			if (participants[0] == from) {
				to = participants[1];
			} else {
				to = participants[0];
			}

			if (chat) {
				var messageObj = {
					date: new Date(),
					from: from,
					to: to,
					message: message
				}
				Meteor.call("addMessageToChat", messageObj, chat._id);
			}

			var excerpt;
			if (message.length > 70) {
				excerpt = message.substring(0,70);
				excerpt = excerpt.concat("......");
			} else {
				excerpt = message;
			}

			var replacements = {
				"%OTHER%": Meteor.user().username,
				"%EXCERPT%": excerpt
			}
			var notificationTitle = RECEIVED_MESSAGE_NOTIFICATION;

			notificationTitle = notificationTitle.replace(/%\w+%/g, function(all) {
				return replacements[all] || all;
			})

			Meteor.call("createNotification",
				notificationTitle,
				from,
				to,
				true,
				RECEIVED_MESSAGE,
				""
			);

			this.done();
		}

	}

});