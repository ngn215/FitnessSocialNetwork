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
      var userData = results[0];
      res.json({email: req.body.email,
                _id: userData._id,
                username: userData.username,
                image: userData.image,
                following: userData.following,
                followers: userData.followers});
    }
  })

}

module.exports.getUsersData = function(req, res){
  User.find({email: req.body.email}, function(error, results){
    if (error){
      console.log("Error Out");
    }

    if (results && results.length === 1){
      var userData = results[0];
      console.log("user already exists");
      res.json({userExists: true});
    }
    else {
      console.log("user does not exist");
      res.json({userExists: false});
    }
  })

}
