Template.navbar.created = function() {};

/*
===============================
=           Rendered          =
===============================
*/

Template.navbar.rendered = function() {
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on click
        alignment: 'right', // Aligns dropdown to left or right edge (works with constrain_width)
        gutter: 0, // Spacing from edge
        belowOrigin: true // Displays dropdown below the button
    });
}


/*
===============================
=           Events            =
===============================
*/

Template.navbar.events({

    "click #logout-user": function(event) {
        console.log('logout');
        //Meteor.logout();
        Router.go('login');
    },

    "change #search": function(event) {
        console.log('registering_change');
    },

    "click .dropdown-button": function(e) {
        $('#logout-user').click(function() {
            event.preventDefault();
            Meteor.logout(function(error) {
                if (!error) {
                    Router.go('login');
                }
            });
        });
    }
});
