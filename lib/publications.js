if (Meteor.isServer) {

	/*
    ===================================================
    =  skills Publication                             =
    =                                                 =
    =  Arguments: None                                =
    =                                                 =
    =  Returns: All skills                            =
    =                                                 =
    =  Used By: dashboard                             =
    =           registerUser                          =
    ===================================================
    */

	Meteor.publish('skills', function() {
        return Skills.find();
    });

    /*
    ===================================================
    =  userProfile Publication                        =
    =                                                 =
    =  Arguments: username                            =
    =                                                 =
    =  Returns: User associated to given username     =
    =                                                 =
    =  Used By: profile                               =
    ===================================================
    */

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

	/*
    ===================================================
    =  userTasks Publication                          =
    =                                                 =
    =  Arguments: userId                              =
    =                                                 =
    =  Returns: All tasks where given user is         =
    =           employed or is an employee            =
    =                                                 =
    =  Used By: dashboard                             =
    ===================================================
    */

	Meteor.publish('userTasks', function(userId) {
		var user = Meteor.users.findOne(userId);
		return Tasks.find({$or: [ {employer: userId}, {employee: userId} ]});
	});

	/*
    ===================================================
    =  taskUsers Publication                          =
    =                                                 =
    =  Arguments: userId                              =
    =                                                 =
    =  Returns: All users that are employed by or are =
    =           employers of the user associated      =
    =           to the given ID                       =
    =                                                 =
    =  Used By: dashboard                             =
    ===================================================
    */

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

	    var users = Meteor.users.find({
	    	_id: { $in: taskUserIds }
	    });

	    return users;

	});

	/*
    ===================================================
    =  profileReviews Publication                     =
    =                                                 =
    =  Arguments: username                            =
    =                                                 =
    =  Returns: Reviews adressed to the user          =
    =           associated to the given username      =
    =                                                 =
    =  Used By: dashboard                             =
    =           registerUser                          =
    ===================================================
    */

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