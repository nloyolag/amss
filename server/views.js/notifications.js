Meteor.methods({

    /*
    ===================================================
    =  Server Method createNotification               =
    =                                                 =
    =  Arguments: title: String                       =
    =             from: userID                        =
    =             to: userID                          =
    =             active: boolean                     =
    =             type: String                        =
    =                                                 =
    =  Returns: Task ID                               =
    =                                                 =
    =  Description: Method that creates a             =
    =  notification                                   =
    =                                                 =
    =  Used By: views/profile/profile-modals.js       =
    =           views/dashboard/dashboard-modals.js   =
    ===================================================
    */

    createNotification: function(title, from, to, active, type) {
        var result = Notifications.insert({
            title: title,
            from: from,
            to: to,
            active: active,
            type: type
        });

        return result;
    }

});