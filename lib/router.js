Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	name: 'dashboard',
	waitOn: function() {
        return Meteor.subscribe('skills');
    }
});

Router.route('/registration', {
	name: 'registerUser',
	waitOn: function() {
        return Meteor.subscribe('skills');
    }
	
});

Router.route('/profile/:username', {
	name: 'profile',
	waitOn: function() {
        return [
            Meteor.subscribe('userProfile', this.params.username),
            Meteor.subscribe('userTasks', Meteor.userId())
        ];
    },
    data: function() {
        var username = Router.current().params.username;
        return Meteor.users.findOne({
            username: username
        });
    }
});