/*
===============================
=           Created           =
===============================
*/
Template.skillEvidence.created = function() {
    //console.log(Meteor.userId());
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

Template.skillEvidence.helpers({
    userSkills: function() {
        return Meteor.users.findOne({
            _id: Meteor.userId()
        }).profile.skills;
    }

});

Template.skillEvidence.helpers({
    addEvidenceSchema: function() {
        return Schema.addEvidence;
    }
});
/*
===============================
=            Forms            =
===============================
*/

AutoForm.hooks({
    addEvidenceForm: {

        before: {
            addEvidence: function(doc, template) {
                var skillId = function(){
                	return Skills.findOne({skillName: doc.skill})._id;
                }
                doc.skill = skillId;
                console.log(doc.skill);
                doc.img = Session.get('imgUrl');
                console.log(doc.img);
            }
        },

        after: {
            addEvidence: function(error, result, template) {
                
            }
        },

        onError: function(operation, error, template) {
            
        }

    }
});


/*
===============================
=           Events            =
===============================
*/


Meteor.startup(function() {
    Uploader.finished = function(index, fileInfo, templateContext) {
        Session.set('imgUrl', fileInfo.url);
    }
})