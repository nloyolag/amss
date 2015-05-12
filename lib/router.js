var onRunHooks = {
    loginRequired: function() {
        if (Meteor.loggingIn()) {
            this.render('loading');
        } else if (Meteor.user()) {
            this.next();
        } else {
            this.render('login');
        }
    }
};

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'login'
});

Router.route('/dashboard', {
	name: 'dashboard',
	waitOn: function() {
        return [
            Meteor.subscribe('users'),
            Meteor.subscribe('skills'),
            Meteor.subscribe('userTasks', Meteor.userId()),
            Meteor.subscribe('taskUsers', Meteor.userId()),
            Meteor.subscribe('chatUsers', Meteor.userId()),
            Meteor.subscribe('dashboardReviews', Meteor.userId()),
            Meteor.subscribe('userNotifications', Meteor.userId()),
            Meteor.subscribe('userChats', Meteor.userId())
        ];
    }
});

Router.route('/settings', {
    name: 'settings',
    waitOn: function() {
        return [
            Meteor.subscribe('users'),
            Meteor.subscribe('skills'),
            Meteor.subscribe('userTasks', Meteor.userId()),
            Meteor.subscribe('taskUsers', Meteor.userId()),
            Meteor.subscribe('chatUsers', Meteor.userId()),
            Meteor.subscribe('dashboardReviews', Meteor.userId()),
            Meteor.subscribe('userNotifications', Meteor.userId()),
            Meteor.subscribe('userChats', Meteor.userId())
        ];
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
            Meteor.subscribe('users'),
            Meteor.subscribe('skills'),
            Meteor.subscribe('userProfile', this.params.username),
            Meteor.subscribe('userTasks', Meteor.userId()),
            Meteor.subscribe('profileReviews', this.params.username),
            Meteor.subscribe('userNotifications', Meteor.userId()),
            Meteor.subscribe('userChats', Meteor.userId())
        ];
    }
});

Router.route('/search/:query', {
    name: 'search',
    waitOn: function() {
        return [
            Meteor.subscribe('users')
        ];
    }
});

Router.onRun(
    onRunHooks.loginRequired, {
        only: [
            'dashboard',
            'profile'
        ]
    }
);
