/*
===============================
=           Helpers           =
===============================
*/

Template.message.helpers({

	messagePhoto: function() {
		return Meteor.users.findOne(this.from).profile.img;
	},

	messageUserName: function() {
		return Meteor.users.findOne(this.from).profile.name;
	}

});