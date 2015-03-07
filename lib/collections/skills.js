/* 
============================
=   Collection: Skills     =
=   + name: String         =
============================
*/

Skills = new Meteor.Collection('skills');

Skills.attachSchema(new SimpleSchema({
	skillName: {
		type: String,
		label: "We didn't consider a skill? Add one!",
		unique: true
	}
}));