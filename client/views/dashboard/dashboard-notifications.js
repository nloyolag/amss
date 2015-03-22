/*
===============================
=           Created           =
===============================
*/

Template.dashboardNotifications.created = function() {
};

/*
===============================
=           Helpers           =
===============================
*/

Template.dashboardNotifications.helpers({
    
    notifications: function() {
        return Notifications.find({}, {
            sort: {date: -1}
        }).fetch();
    }

});

/*
===============================
=           Events            =
===============================
*/
