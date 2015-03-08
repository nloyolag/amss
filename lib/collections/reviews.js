/* 
==============================
=   Collection: Reviews      =
=   + title: String          =
=   + description: String    =
=   + score: Int             =
=   + task: taskId           =
=   + to: userId             =
=   + from: userId           =
==============================
*/

Reviews = new Meteor.Collection('reviews');

Reviews.attachSchema(new SimpleSchema({
  	title: {
	    type: String,
	    label: "Title"
	},
	description: {
		type: String,
		label: "Description"
	},
	score: {
		type: Number,
		label: "Rating",
		min: 0,
		max: 5
	},
	task: {
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
	to: {
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
	from: {
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
}));