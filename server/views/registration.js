Meteor.methods({

    /*
    ===================================================
    =  Server Method registerUser                     =
    =                                                 =
    =  Arguments: Autoform Doc                        =
    =                                                 =
    =  Returns: Username and Password                 =
    =           (for client login)                    =
    =                                                 =
    =  Description: Method that creates a user.       =
    =                                                 =
    =  Used By: views/registration/registration.js    =
    =           views/registration/registration.html  =
    ===================================================
    */

	registerUser: function(name, username, email, password, userTitle, bio, location, merits, skills, img) {

        if (Meteor.users.findOne({ "emails.address" : email })) {
            throw new Meteor.Error(400, 'Email already exists.');
        }

        if (Meteor.users.findOne({ "username" : username })) {
            throw new Meteor.Error(400, 'Username already exists.');
        }

        var userId = Accounts.createUser({
            username: username,
            email: email,
            password: password,
            profile: {
                name: name,
                userTitle: userTitle,
                bio: bio,
                location: location,
                merits: merits,
                skills: skills,
                img: img,
                active: true
            }
        });

  		return {
            password: password,
            username: username
        }; 

	}

});

Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/public/.uploads/images/tmp',
    uploadDir: process.env.PWD + '/public/.uploads/images/',
    checkCreateDirectories: true
  })
});