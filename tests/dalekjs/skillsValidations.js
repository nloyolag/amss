var helpers = require("./helpers");

module.exports = {

	'Should validate a skill': function(test) {
		helpers.login(test);
		test
			.open('http://localhost:3000/profile/polo')
			.click('.single-skill:first-of-type .skill-button')
			.assert.text('.single-skill:first-of-type .skill-count').is('1')
			.assert.doesntExist('.single-skill:first-of-type .skill-button', 'Validation button was removed')
			.done();
	}

};