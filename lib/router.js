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

Router.route('/profile/:_id', {
	name: 'profile',
	data: function() { return Users.findOne(this.params._id); }
});

Router.route('/registration', {
	name: 'registerUser',
	waitOn: function() {
        return Meteor.subscribe('skills');
    }
	
});