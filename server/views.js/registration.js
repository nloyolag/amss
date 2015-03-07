Meteor.methods({

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
               active: true,

           }
       	});    

		return {
           password: doc.password,
           username: doc.username
       }; 

	}

});
