/*
===============================
=           Created           =
===============================
*/

Template.profileInfo.created = function() {

	var tasks = Tasks.find({
		employer: Meteor.userId(),
		employee: Session.get("currentProfileId"),
		employerStatus: 'On going'
	}).fetch();

	if (tasks.length > 0) {
		Session.set("hasActiveTask", true);
	} else {
		Session.set("hasActiveTask", false);
	}

};


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
					alertify.success("Se ha creado la tarea exitosamente");
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

Template.profileInfo.helpers({

	createTaskSchema: function() {
		return Schema.createTask;
	},

	hasActiveTask: function() {
		return Session.get("hasActiveTask");
	},

	profileUser: function() {
		return Meteor.users.findOne({
			username: Session.get("currentProfileUsername")
		});
	}

});


/*
===============================
=           Events            =
===============================
*/

Template.profileInfo.events({

    "click #task-me": function(event) {

    	event.preventDefault();
    	$('#create-task').openModal();
 		      
    }

});
