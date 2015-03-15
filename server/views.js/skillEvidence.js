Meteor.methods({

    /*
    ===================================================
    =  Server Method addSkillEvidence                 =
    =                                                 =
    =  Arguments: Autoform Doc                        =
    =                                                 =
    =                                                 =
    =                                                 =
    =  Description: Adds skill evidence to the db     =
    =                                                 =
    =  Used By: views/registration/skillEvidence.js   =
    =           views/registration/skillEvidence.html =
    ===================================================
    */

    addSkillEvidence: function(doc) {
        
        Schema.addEvidence.clean(doc);
        check(doc, Schema.createUser);   
        var skillId = doc.skill;   
        Meteor.users.update({_id: this.userId }, {
            $set: {
                profile: {
                    photos: {
                        skillId: doc.img
                    }
                }
            }
        });
    }

});

Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/public/.uploads/skill_evidence/tmp',
    uploadDir: process.env.PWD + '/public/.uploads/skill_evidence/',
    checkCreateDirectories: true
  })
});