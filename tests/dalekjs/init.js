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
	},

	'Should create some users': function(test) {
		test
			.open('http://localhost:3000/registration')
			.type('#profile-name-create', 'test1')
			.type('#profile-username-create', 'test1')
			.type('#profile-password-create', 'testpass')
			.type('#profile-confirmPassword-create', 'testpass')
			.type('#profile-email-create', 'test1@test.com')
			.type('#profile-user-title-create', 'Master Tester')
			.type('#profile-bio-create', 'I am the tester to rule them all')
			.type('#profile-location-create', 'TestLand')
			.type('.select2-choices input', 'testa\uE007')
			.type('.select2-choices input', 'testb\uE007')
			.type('.select2-choices input', 'testc\uE007')
			.assert.numberOfElements('.select2-choices .select2-search-choice', 3, '3 skills are present')
			.click('#submit-user')
			.wait(500)
			.click('.dropdown-button')
			.click('#logout-user')
			.open('http://localhost:3000/registration')
			.type('#profile-name-create', 'test2')
			.type('#profile-username-create', 'test2')
			.type('#profile-password-create', 'testpass')
			.type('#profile-confirmPassword-create', 'testpass')
			.type('#profile-email-create', 'test2@test.com')
			.type('#profile-user-title-create', 'Master Tester')
			.type('#profile-bio-create', 'I am the tester to rule them all')
			.type('#profile-location-create', 'TestLand')
			.type('.select2-choices input', 'testa\uE007')
			.type('.select2-choices input', 'testb\uE007')
			.type('.select2-choices input', 'testc\uE007')
			.assert.numberOfElements('.select2-choices .select2-search-choice', 3, '3 skills are present')
			.click('#submit-user')
			.done();
	}

};