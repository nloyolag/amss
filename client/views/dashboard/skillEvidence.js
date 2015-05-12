/*
===============================
=           Created           =
===============================
*/
Template.skillEvidence.created = function() {

};
/*
===============================
=          Rendered           =
===============================
*/

Template.skillEvidence.rendered = function() {
    $(document).ready(function(){
        $('.collapsible').collapsible({
          accordion : false 
      });
    });
    $('a[class=evidenceImages]').fancybox();
}

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
        var id = Meteor.userId();
        var name = event.target.dataset.name;
        var evidence = event.target.dataset.evidence;
        Meteor.call("deleteEvidence", id, name, evidence);
    },
    'click a[class=evidenceImages]' : function(e){
        e.preventDefault();
    }
});

Meteor.startup(function() {
    Uploader.finished = function(index, fileInfo, templateContext) {
        Session.set('imgUrl', fileInfo.url);
    }
})

