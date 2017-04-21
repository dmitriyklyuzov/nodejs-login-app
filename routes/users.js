var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Register
router.get('/register', function(req, res, next) {
	// render a view called 'Register'
	res.render('register', {title: 'Sign Up'});
});

// Login
router.get('/login', function(req, res, next) {
	// render a view called 'Login'
	res.render('login', {title: 'Log in'});
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// console.log(name);

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	// What to do if there are errors
	if(errors){
		// Re-render the page with errors in response
		res.render('register', { errors: errors });
	}

	// What to do if there are no errors
	else{
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

module.exports = router;
