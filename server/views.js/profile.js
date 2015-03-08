Meteor.methods({

	createTask: function(doc) {
		Schema.createTask.clean(doc);
		check(doc, Schema.createTask);

        var result = Tasks.insert({
            name: doc.name,
            description: doc.description,
            employer: doc.employer,
            employee: doc.employee,
            employerStatus: 'On going',
            employeeStatus: 'Confirmation',
            startDate: new Date()
        });

        return result;
	}

});