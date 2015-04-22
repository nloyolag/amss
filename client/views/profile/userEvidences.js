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
=          Rendered          =
===============================
*/

Template.userEvidences.rendered = function() {
    $(document).ready(function(){
        $('.collapsible').collapsible({
          accordion : false
      });
    });
}

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
