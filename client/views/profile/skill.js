/*
===============================
=           Helpers           =
===============================
*/

Template.skill.helpers({

	hasValidated: function() {
		var userId = Meteor.userId();
		return $.inArray(userId, this.validations) > 0;
	},

	profileUserIsLoggedUser: function() {
		return Meteor.user().username === Session.get("currentProfileUsername");
	}

});

/*
===============================
=           Events            =
===============================
*/

Template.skill.events({

	"click #validate-skill": function(event) {

		event.preventDefault();

		var validatorId = Meteor.userId();
		var profileUser = Meteor.users.findOne({
			username: Session.get("currentProfileUsername")
		});
		var skillName = this.name;

		Meteor.call("validateSkill", skillName, validatorId, profileUser);

	}

});