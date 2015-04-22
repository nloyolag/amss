/*
===============================
=           Created           =
===============================
*/
Template.userMerits.created = function() {
    var username = Router.current().params.username;
    Session.set("currentProfileUsername", username);
    var user = Meteor.users.findOne({username: username});
    Session.set("currentProfileId", user._id);
};

/*
===============================
=           Helpers           =
===============================
*/

Template.userMerits.helpers({
    userMerits: function() {
        var merits =  Meteor.users.findOne({
            _id: Session.get("currentProfileId")
        }).profile.merits;

        var userMerits = [];

        for(i in merits) {
            if(merits[i].active == 1) {
                userMerits.push(merits[i]);
            }
        }
        return userMerits;
    }

});
