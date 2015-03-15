Meteor.methods({

    /*
    ===================================================
    =  Server Method createStartTaskNotification      =
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
    =  notification when a user asks another to       =
    =  develop a task                                 =
    =                                                 =
    =  Used By: views/profile/profile-modals.js       =
    ===================================================
    */

    createStartTaskNotification: function(title, from, to, active, type) {
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