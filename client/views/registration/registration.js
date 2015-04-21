/*
===============================
=           Created           =
===============================
*/

Template.registerUser.created = function() {

};

/*
===============================
=            Forms            =
===============================
*/

AutoForm.hooks({
    createUserForm: {

        onSubmit: function(insertDoc, updateDoc, currentDoc) {

            event.preventDefault();

            var name = $('#profile-name-create')[0].value;
            var username = $('#profile-username-create')[0].value;
            var email = $('#profile-email-create')[0].value;
            var password = $('#profile-password-create')[0].value;
            var userTitle = $('#profile-user-title-create')[0].value;
            var bio = $('#profile-bio-create')[0].value;
            var location = $('#profile-location-create')[0].value;
            var skills = insertDoc.skills;  

            var merits = [{
                name: "VeteranTasker",
                icon: "null",
                active: 0
            }, {
                name: "CertifiedTasker",
                icon: "null",
                active: 0
            }, {
                name: "NotoriousTasker",
                icon: "null",
                active: 0
            }, {
                name: "CommittedTasker",
                icon: "null",
                active: 0
            }, {
                name: "AllStarTasker",
                icon: "null",
                active: 0
            }];  

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

            if (Session.get('imgUrl')) {
                insertDoc.img = Session.get('imgUrl');
            } else {
                insertDoc.img = './public/images/default.jpg';
            }

            var img = insertDoc.img;

            Meteor.call(
                "registerUser",
                name,
                username,
                email,
                password,
                userTitle,
                bio,
                location,
                merits,
                skillsObj,
                img,
                function(error, result) {
                    if (!error) {
                        Meteor.loginWithPassword(result.username, result.password, function(error) {
                            if (!error) {
                                alertify.success('Has registrado tu usuario');
                                Router.go('dashboard');
                            } 
                        });
                    } 
                }
            );

            this.done();
        },

        onError: function(operation, error, template) {
            if (error.reason && error.reason === 'Email already exists.') {
                AutoForm.getValidationContext('createUserForm').addInvalidKeys([{
                    name: 'email',
                    type: 'unique'
                }]);
            } else if (error.reason && error.reason === 'Username already exists.') {
                AutoForm.getValidationContext('createUserForm').addInvalidKeys([{
                    name: 'username',
                    type: 'unique'
                }]);
            }
        }

    }
});

/*
===============================
=           Helpers           =
===============================
*/

Template.registerUser.helpers({
    createUserSchema: function() {
        return Schema.createUser;
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
