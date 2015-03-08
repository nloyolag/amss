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

}