var helpers = require("./helpers");

module.exports = {

	'Should create some skills': function(test) {
		test
			.open('http://localhost:3000/registration')
			.wait(500)
			.type('#add-skill', 'testa')
			.click('#submit-skill')
			.type('#add-skill', 'testb')
			.click('#submit-skill')
			.type('#add-skill', 'testc')
			.click('#submit-skill')
			.assert.chain()
				.numberOfElements('#profile-skills-create option', 4, '4 options are present')
				.attr('#profile-skills-create option:nth-of-type(2)', 'value', 'testa')
				.attr('#profile-skills-create option:nth-of-type(3)', 'value', 'testb')
				.attr('#profile-skills-create option:nth-of-type(4)', 'value', 'testc')
			.end()
			.done();
	}

};