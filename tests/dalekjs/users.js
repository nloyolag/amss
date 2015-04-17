module.exports = {

	'Should create a user': function(test) {
		test
			.open('http://localhost:3000/registration')
			.type('#profile-name-create', 'test1')
			.type('#profile-username-create', 'test1')
			.type('#profile-password-create', 'testpass')
			.type('#profile-confirmPassword-create', 'testpass')
			.type('#profile-email-create', 'test1@test.com')
			.type('#profile-userTitle-create', 'Master Tester')
			.type('#profile-bio-create', 'I am the tester to rule them all')
			.type('#profile-location-create', 'TestLand')
			.click('#profile-skills-create')
			.assert.text('.single-skill:first-of-type .skill-count').is('1')
			.assert.doesntExist('.single-skill:first-of-type .skill-button', 'Validation button was removed')
			.done();
	}

};