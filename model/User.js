var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-express-loginsystem');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //console.log('connected');
});

var userSchema = mongoose.Schema({ name: String, password: String });
var User = mongoose.model('User', userSchema);

var registerUser = function(userDetail) {
  var user = new User(userDetail);
  user.save(function (err) {
    if (err) return console.error(err);
    console.log(user.name + ' saved');
  })
}

module.exports = registerUser;

/*
var user1 = new User({ name: 'Edwin', password: 'Harly'});
user1.save(function(err) {
  if (err) return console.error(err);
  console.log('User saved');
})
*/