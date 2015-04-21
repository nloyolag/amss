module.exports = {

	'should login': function(test) {
		test
			.open('http://localhost:3000')
			.type('#login-username', 'dasdasd')
			.type('#login-password', 'dasdasd')
			.click('#login-button')
			.wait(300)
			.assert.exists('.ajs-error')
			.assert.text('.ajs-error', 'Incorrect user or password', 'Incorrect login alert')
			.open('http://localhost:3000')
			.type('#login-username', 'test1')
			.type('#login-password', 'testpass')
			.click('#login-button')
			.wait(1000)
			.assert.url('http://localhost:3000/dashboard', 'Login redirects to dashboard')
			.done();
	},

	'should logout': function(test) {
		test
			.open('http://localhost:3000/dashboard')
			.click('.dropdown-button')
			.wait(1000)
			.click('#dropdown-navbar #logout-user')
			.assert.exists('#login-form', 'Login form exists')
			.done();
	}

};