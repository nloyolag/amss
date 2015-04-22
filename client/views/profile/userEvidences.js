/*
===============================
=           Created           =
===============================
*/
Template.userEvidences.created = function() {
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

Template.userEvidences.helpers({
    userSkills: function() {
        return Meteor.users.findOne({
            _id: Session.get("currentProfileId")
        }).profile.skills;
    }

});
