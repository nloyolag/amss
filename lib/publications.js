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

        if (!user) {
            this.ready();
            return;
        }

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
    =  chatUsers Publication                          =
    =                                                 =
    =  Arguments: userId                              =
    =                                                 =
    =  Returns: All users that have chats with the    =
    =           user associated to the given ID       =
    =                                                 =
    =  Used By: dashboard                             =
    ===================================================
    */

    Meteor.publish('chatUsers', function(userId) {

        var user = Meteor.users.findOne(userId);

        if (!user) {
            this.ready();
            return;
        }

        var chats = Chats.find({
            participants: { $in: [userId]}
        }).fetch();

        var chatUserIds = [];

        chats.forEach(function(chat) {
            for (var i = 0; i < chat.participants.length; i++) {
                if (typeof chatUserIds[chat.participants[i]] === 'undefined')
                    chatUserIds.push(chat.participants[i]);
            }
        });

        var users = Meteor.users.find({
            _id: { $in: chatUserIds }
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
    =  Used By: profile                               =
    ===================================================
    */

	Meteor.publish('profileReviews', function(username) {

		var user = Meteor.users.findOne({
	        username: username
	    });

	    if (!user) {
	        this.ready();
	        return;
	    }        

	    return Reviews.find({to: user._id});

	});

    /*
    ===================================================
    =  dashboardReviews Publication                   =
    =                                                 =
    =  Arguments: userId                              =
    =                                                 =
    =  Returns: Reviews adressed to the user          =
    =           and written by the user               =
    =                                                 =
    =  Used By: dashboard                             =
    ===================================================
    */

    Meteor.publish('dashboardReviews', function(userId) {

        var user = Meteor.users.findOne(userId);

        if (!user) {
            this.ready();
            return;
        }        

        return Reviews.find({
            $or: [ {to: user._id}, {from: user._id} ]
        });

    });


    /*
    ===================================================
    =  delegatedReviews Publication                   =
    =                                                 =
    =  Arguments: username                            =
    =                                                 =
    =  Returns: Reviews sent by the user              =
    =           associated to the given username      =
    =                                                 =
    =  Used By: dashboard                             =
    =           registerUser                          =
    ===================================================
    */

    Meteor.publish('delegatedReviews', function(username) {

        var user = Meteor.users.findOne({
            username: username
        });

        if (!user) {
            this.ready();
            return;
        }

        return Reviews.find({from: user._id});

    });

    /*
    ===================================================
    =  userNotifications Publication                  =
    =                                                 =
    =  Arguments: userID                              =
    =                                                 =
    =  Returns: Notifications addressed to logged in  =
    =           user                                  =
    =                                                 =
    =  Used By: dashboard                             =
    =           profile                               =
    ===================================================
    */

    Meteor.publish('userNotifications', function(userId) {

        var user = Meteor.users.findOne(userId);

        if (!user) {
            this.ready();
            return;
        }

        return Notifications.find({to: user._id, active: true});

    });

    /*
    ===================================================
    =  userChats Publication                          =
    =                                                 =
    =  Arguments: userID                              =
    =                                                 =
    =  Returns: Chats were the user participates      =
    =                                                 =
    =  Used By: dashboard                             =
    =           profile                               =
    ===================================================
    */

    Meteor.publish('userChats', function(userId) {

        var user = Meteor.users.findOne(userId);

        if (!user) {
            this.ready();
            return;
        }

        return Chats.find({ participants: userId });

    });

}