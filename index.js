"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const User = require('./model/User.js');
// let registerUser = require('./model/User.js').registerUser;
// let authUser = require('./model/User.js').authUser;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
/*
let MongoClient = require('mongodb').MongoClient;
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-express-loginsystem');
let assert = require('assert');
*/

// let url = 'mongodb://localhost:27017/testregister';

passport.use(new LocalStrategy(
	function (u, p, done) {
		console.log('dalam passport')
		User.findOne({ name: username, password: password }, 'name', function(err, data) {
			if (err) return done(err);
			if (!data) return done(null, false, { message: 'Incorrect username' });
			if (!data.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password'});
			}
			console.log(data);
			return done(null, data);
		});
	}
));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/layout/login.html');
});

app.post('/register', function(req, res) {
    let username = req.body.user.name;
    let password = req.body.user.pass;
    console.log(username, password);
    let newUser = new User({ name: username, password: password });
	newUser.save(function (err) {
		if (err) throw err;
		console.log('New user saved');
	})
    res.end();
});

app.post('/login', function(req, res) {
	let username = req.body.user.name;
	let password = req.body.user.pass;
	
	// let userDetail = { name: username, password: password };
	console.log('post login')
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true });
	/*
	User.findOne({ name: username, password: password }, 'name', function(err, data) {
		if (err) return handleError(err);
		console.log(data);
	})
	*/
	res.end();
});

app.listen(8001, function() {
    console.log('Server is running on port 8001');
});

/*
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log('Connected to MongoDB');
    db.close();
})
*/
