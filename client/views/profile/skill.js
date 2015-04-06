/*
===============================
=           Helpers           =
===============================
*/

Template.skill.helpers({

	hasValidated: function() {
		var userId = Meteor.userId();
		return $.inArray(userId, this.validations) !== -1;
	},

	profileUserIsLoggedUser: function() {
		return Meteor.user().username === Session.get("currentProfileUsername");
	},

	validationCount: function() {
		return this.validations.length;
	}

});

Template.skill.rendered = function(){
	$(".hover-skill").hover(
		function () {
			$(this).removeClass('mdi-action-favorite-outline');
			$(this).addClass('mdi-action-favorite');
		},
		function () {
			$(this).removeClass('mdi-action-favorite');
			$(this).addClass('mdi-action-favorite-outline');
		}
	);
};


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