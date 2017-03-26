"use strict";

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var registerUser = require('./model/User.js');
/*
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-express-loginsystem');
var assert = require('assert');
*/

// var url = 'mongodb://localhost:27017/testregister';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/layout/register.html');
});

app.post('/register', function(req, res) {
    var username = req.body.user.name;
    var password = req.body.user.pass;
    console.log(username, password);
    var userDetail = { name: username, password: password };
    registerUser(userDetail);
    res.end();
});

app.post('/login', function(req, res) {
    
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