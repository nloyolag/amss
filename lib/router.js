Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {name: 'dashboard'});

Router.route('/profile/:_id', {
	name: 'profile',
	data: function() { return Users.findOne(this.params._id); }
});