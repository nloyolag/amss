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

	registerUser: function(doc) {
		
  		Schema.createUser.clean(doc);
          check(doc, Schema.createUser);      
          var userId = Accounts.createUser({
             username: doc.username,
             email: doc.email,
             password: doc.password,
             profile: {
                 name: doc.name,
                 userTitle: doc.userTitle,
                 bio: doc.bio,
                 location: doc.location,
                 skills: doc.skills,
                 img: doc.img,
                 active: true
             }
         	});    

  		return {
          password: doc.password,
          username: doc.username
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