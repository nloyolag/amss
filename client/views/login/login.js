/*
===============================
=           Created           =
===============================
*/

Template.login.created = function() {
    if (Meteor.user()) {
        Router.go('dashboard');
        return false;
    }
};

/*
===============================
=            Forms            =
===============================
*/

/*
===============================
=           Helpers           =
===============================
*/

/*
===============================
=           Events            =
===============================
*/


Template.login.events({
    'submit #login-form': function(event) {

        event.preventDefault();

        var username = $('#login-username')[0].value;
        var password = $('#login-password')[0].value;
        Meteor.loginWithPassword(username, password, function(error) {

            if (error) {
                alertify.error('Incorrect user or password');

            } else {

                var user = Meteor.user();

                if (user.profile.active) {

                	Router.go('dashboard');

                } else {

                    alertify.error('Your account is not active. Contact the Task Me team');
                    Meteor.logout();
                }
            }
        })
    }
});