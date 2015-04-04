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