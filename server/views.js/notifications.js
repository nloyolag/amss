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
    =             task: taskID                        =
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

    createNotification: function(title, from, to, active, type, task) {
        var result = Notifications.insert({
            title: title,
            from: from,
            to: to,
            active: active,
            type: type,
            date: new Date(),
            task: task
        });

        return result;
    },

    /*
    ===================================================
    =  Server Method dismissNotification              =
    =                                                 =
    =  Arguments: notificationId                      =
    =                                                 =
    =  Returns:                                       =
    =                                                 =
    =  Description: Method that makes a notification  =
    =  unactive                                       =
    =                                                 =
    =  Used By: views/dashboard/dashboard-modals.js   =
    ===================================================
    */

    dismissNotification: function(notificationId) {
        return Notifications.update(
            {_id: notificationId},
            {$set: {active: false}}
        );
    }

});