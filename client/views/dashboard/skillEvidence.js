/*
===============================
=           Created           =
===============================
*/
Template.skillEvidence.created = function() {

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
                var id = Meteor.userId();
                doc.img = Session.get('imgUrl');
                Meteor.call("addSkillEvidence", id, doc.skill, doc.img);
            }
        },

        after: {
            addEvidence: function(error, result, template) {

                if (!error) {
                    alertify.success("The evidence was added succesfully");
                }           
                
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

Template.skillEvidence.events({
'click .deleteSkillEvidence': function(){
    console.log('Jere');
    var id = Meteor.userId();
    var data = $.parseJSON($(this).attr('data-evidence'));
    console.log(data);
    //Meteor.call("deleteEvidence", id);
}});

Meteor.startup(function() {
    Uploader.finished = function(index, fileInfo, templateContext) {
        Session.set('imgUrl', fileInfo.url);
    }
})

