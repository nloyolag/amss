/*
===============================
=           Created           =
===============================
*/

Template.dashboardSettings.created = function() {

};

/*
===============================
=           Rendered          =
===============================
*/

Template.dashboardSettings.rendered = function() {

    var user = Meteor.users.findOne({
            _id: Meteor.userId()
    }); 

    $('#profile-name-edit')[0].value = user.profile.name;
    $('#profile-username-edit')[0].value = user.username;
    $('#profile-email-edit')[0].value = user.emails[0].address;
    $('#profile-user-title-edit')[0].value = user.profile.userTitle;
    $('#profile-bio-edit')[0].value = user.profile.bio;
    $('#profile-location-edit')[0].value = user.profile.location;
    $('#profile-skills-edit')[0].value = user.profile.skills;
}

/*
===============================
=            Forms            =
===============================
*/

AutoForm.hooks({
    editProfileForm: {

        onSubmit: function(insertDoc, updateDoc, currentDoc) {

            event.preventDefault();

            var userId = Meteor.userId();

            var name = $('#profile-name-edit')[0].value;
            var username = $('#profile-username-edit')[0].value;
            var email = $('#profile-email-edit')[0].value;
            var userTitle = $('#profile-user-title-edit')[0].value;
            var bio = $('#profile-bio-edit')[0].value;
            var location = $('#profile-location-edit')[0].value;
            var skills = insertDoc.skills;  

            var skillsObj = [];

            if (skills) {
                skills.forEach(function(part, index, skills) {
                    skills[index] = skills[index].toLowerCase();
                    skillsObj.push({
                        name: skills[index],
                        validations: [],
                        evidences: []
                    });
                });
            }

            Meteor.call(
                "editProfile",
                userId,
                name,
                username,
                email,
                userTitle,
                bio,
                location,
                skillsObj,
                function(error, result) {
                    if (!error) {
                        alertify.success('User updated');
                    } else {
                        if (error.reason && error.reason === 'Email already exists.') {
                            AutoForm.getValidationContext('editProfileForm').addInvalidKeys([{
                                name: 'email',
                                type: 'unique'
                            }]);
                        } else if (error.reason && error.reason === 'Username already exists.') {
                            AutoForm.getValidationContext('editProfileForm').addInvalidKeys([{
                                name: 'username',
                                type: 'unique'
                            }]);
                        }
                    }
                }
            );

            this.done();
        }

    }
});

/*
===============================
=           Helpers           =
===============================
*/

Template.dashboardSettings.helpers({
    editProfileSchema: function() {
        return Schema.editProfile;
    }
});

/*
===============================
=           Events            =
===============================
*/
Template.dashboardSettings.events({
'click #deactivateUser': function(){
    alertify.confirm('Are you sure you want to deactivate your account?').set('onok', function(closeEvent)
    {     
        var id = Meteor.userId();
        Meteor.call("deleteUser", id);
        Meteor.logout(function(error) {
            if (!error) {
                Router.go('login');
            }
        });}
    , 'reverseButtons', true );
}});