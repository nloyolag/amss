Template.search.created = function() {};


/*
===============================
=           Helpers           =
===============================
*/

Template.search.helpers({

    searchResults: function() {
        var query = Session.get("query");
        var param = new RegExp(query, 'g');
        return Meteor.users.find( {$and : [{$or: [ { "username": param}, { "profile.skills.name": param}]}]});
    }/*,

    positiveReviews: function() {
    var query = Session.get("query");
    var param = new RegExp(query, 'g');
    var reviewsNum = Reviews.find({
        to: param
    }).count();

    var positiveReviews = Reviews.find(
    {$and : [
        {to: param},
        {$or : [
            {score: 4},
            {score: 5}
        ]}
    ]
    }).count();
    
    return positiveReviews > (reviewsNum / 2)**/
});