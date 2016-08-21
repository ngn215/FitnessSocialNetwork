var mongoose = require('mongoose');
var User = require('../datasets/users');

module.exports.signup = function(req, res){
  console.log(req.body);

  var user = new User(req.body);
  user.save();

  res.json(req.body);
}

module.exports.login = function(req, res){
  User.find(req.body, function(error, results){
    if (error){
      console.log("Error Out");
    }

    if (results && results.length === 1){
      res.json(req.body.email);
    }
  })

}
