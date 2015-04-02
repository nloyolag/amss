/*
===============================
=           Helpers           =
===============================
*/

Template.messageExcerpt.helpers({

	chatPhoto: function() {
		var userId = Meteor.userId();
		var message = this.messages[0];
		var otherUserId;

		if (message.from === userId) {
			otherUserId = message.to;
		} else {
			otherUserId = message.from;
		}

		return Meteor.users.findOne(otherUserId).profile.img;
	},

	chatUserName: function() {
		var userId = Meteor.userId();
		var message = this.messages[0];
		var otherUserId;

		if (message.from === userId) {
			otherUserId = message.to;
		} else {
			otherUserId = message.from;
		}

		return Meteor.users.findOne(otherUserId).profile.name;
	},

	chatExcerpt: function() {
		var message = this.messages[this.messages.length - 1];
		var excerpt;
		if (message.message.length > 70) {
			excerpt = message.message.substring(0,70);
			excerpt = excerpt.concat("......");
		} else {
			excerpt = message.message;
		}
		
		return excerpt;
	}

});

/*
===============================
=           Events            =
===============================
*/

Template.messageExcerpt.events({

	"click .show-conversation": function(event) {

		event.preventDefault();
        Session.set("openChatId", this._id);
        $('#view-conversation').openModal();
	}

})