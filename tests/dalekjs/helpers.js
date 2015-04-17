module.exports = {
	'login': function(test) {
		test
			.open('http://localhost:3000')
			.type('#login-username', 'noe')
			.type('#login-password', 'procesos')
			.click('#login-button')
			.wait(1000)
			.assert.url('http://localhost:3000/dashboard', 'Login redirects to dashboard')
	}
};