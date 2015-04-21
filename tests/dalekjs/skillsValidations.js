var helpers = require("./helpers");

module.exports = {

	'Should validate a skill': function(test) {
		helpers.login(test);
		test
			.open('http://localhost:3000/profile/test2')
			.click('.single-skill:first-of-type .skill-button')
			.wait(500)
			.assert.text('.single-skill:first-of-type .skill-count').is('1')
			.assert.numberOfElements('.single-skill .skill-button', 2, 'Validation button was removed')
			.done();
	}

};