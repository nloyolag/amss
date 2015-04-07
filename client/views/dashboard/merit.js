/*
===============================
=           Created           =
===============================
*/
Template.merit.created = function() {

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

Template.merit.helpers({
    userMerits: function() {
        var merits =  Meteor.users.findOne({
            _id: Meteor.userId()
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
