if (Meteor.isServer) {

	Meteor.publish('skills', function() {
        return Skills.find();
    });

    Meteor.publish('userProfile', function(username) {

	    var user = Meteor.users.findOne({
	        username: username
	    });

	    // if we can't find it, mark the subscription as ready and quit
	    if (!user) {
	        this.ready();
	        return;
	    }

	    return Meteor.users.find(user._id);
	
	});

	Meteor.publish('userTasks', function(userId) {
		var user = Meteor.users.findOne(userId);
		return Tasks.find({$or: [ {employer: userId}, {employee: userId} ]});
	});

	Meteor.publish('taskUsers', function(userId) {

		var user = Meteor.users.findOne(userId);

		var tasks = Tasks.find({
	    	$or: [ {employer: user._id}, {employee: user._id} ]
	    }).fetch();

	    var taskUserIds = [];

	    tasks.forEach(function(task) {
	    	if (typeof taskUserIds[task.employer] === 'undefined')
		    	taskUserIds.push(task.employer);
		    if (typeof taskUserIds[task.employee] === 'undefined')
		    	taskUserIds.push(task.employee);
		});

		console.log(taskUserIds);

	    var users = Meteor.users.find({
	    	_id: { $in: taskUserIds }
	    });

	    console.log(users);

	    return users;

	});

	Meteor.publish('profileReviews', function(username) {

		var user = Meteor.users.findOne({
	        username: username
	    });

	    // if we can't find it, mark the subscription as ready and quit
	    if (!user) {
	        this.ready();
	        return;
	    }

	    return Reviews.find({to: user._id});

	});

}