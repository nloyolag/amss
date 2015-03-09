SimpleSchema.messages({
	passwordMissmatch: "Passwords don't match",
	unique: "This [label] is already in use"
});

Schema = {};

/*
===========================================
===========================================
=                  USER                   =
===========================================
===========================================
*/

/*
===========================================
=           Create User Form             =
===========================================
*/

Schema.createUser = new SimpleSchema({
	name: {
	    type: String,
	    label: "Name"
	},
	username: {
		type: String,
	    label: "User"
	},
    password: {
        type: String,
        label: "Contraseña",
        min: 6
    },
    confirmPassword: {
        type: String,
        label: "Confirmar contraseña",
        min: 6,
        custom: function() {
            if (this.value != this.field('password').value) {
                return "passwordMissmatch";
            }
        }
    },
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
	    label: "Email"
	},
	userTitle: {
		type: String,
		label: "Title"
	},
	bio: {
		type: String,
	    label: "Bio"
	},
	location: {
		type: String,
	    label: "Location"
	},
	skills: {
		type: [String],
	    autoform: {
	    	type: "select2",
			afFieldInput: {
				multiple: true,
				tags: true
			},
	      	options: function () {
	        	return Meteor.helpers.getSkills();
	      	}
	    }
	},
	img: {
       type: String,
       autoform: {
           afFieldInput: {
               type: "hidden"
           },
           afFormGroup: {
               label: false
           }
       }
   } 
});

/*
===========================================
=           Edit Profile Form             =
===========================================
*/

Schema.editProfile = new SimpleSchema({
	name: {
	    type: String,
	    label: "Name"
	},
	username: {
		type: String,
	    label: "User"
	},
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
	    label: "Email"
	},
	userTitle: {
		type: String,
		label: "Title"
	},
	bio: {
		type: String,
	    label: "Bio"
	},
	location: {
		type: String,
	    label: "Nombre"
	},
	skills: {
		type: String,
	    autoform: {
	    	type: "select2",
			afFieldInput: {
				multiple: true,
				tags: true
			},
	      	options: function () {
	        	return Meteor.helpers.getSkills();
	      	}
	    }
	}
});

/*
===========================================
===========================================
=                  TASK                   =
===========================================
===========================================
*/

/*
===========================================
=            Create Task Form             =
===========================================
*/

Schema.createTask = new SimpleSchema({
	name: {
	    type: String,
	    label: "Task Name"
	},
	description: {
		type: String,
	    label: "Description"
	},
	employer: {
	    type: String,
        autoform: {
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
	},
	employee: {
		type: String,
        autoform: {
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
	}
});
