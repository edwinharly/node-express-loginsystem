const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-express-loginsystem');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db is connected');
});

const userSchema = mongoose.Schema({ name: String, password: String });
const User = mongoose.model('User', userSchema);

module.exports = User;

/*
let registerUser = function(userDetail) {
  let user = new User(userDetail);
  user.save(function (err) {
    if (err) return console.error(err);
    console.log(user.name + ' saved');
  })
}

let authUser = function(userDetail) {
	let user = new User(userDetail);
	User.findOne({ name: user.name, password: user.password }, 'name', function(err, data) {
		if (err) return handleError(err);
		console.log(data + ' is found');
	});
}
*/

/*
let user1 = new User({ name: 'Edwin', password: 'Harly'});
user1.save(function(err) {
  if (err) return console.error(err);
  console.log('User saved');
})
*/
