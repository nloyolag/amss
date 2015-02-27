SimpleSchema.messages({
	passwordMissmatch: "Las contraseñas no coinciden",
	required: "Este campo es requerido",
	minString: "Este campo debe tener al menos [min] caractéres",
	unique: "Este [label] ya está en uso. Por favor ingresa uno nuevo",
	"regEx": [
		{exp: SimpleSchema.RegEx.Email, msg: "Por favor ingresa un correo electrónico válido"}
	],
    noBudget: "No tienes suficiente presupuesto para este tipo de gasto"
});

Schema = {};

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