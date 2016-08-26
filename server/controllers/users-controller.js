var Users = require('../datasets/users');

module.exports.getUsers = function(req, res){
  Users.find({}, function(err, usersData){
    if (err) {
      res.error(err);
    } else {
      res.json(usersData);
      console.log(usersData);
    }
  })
}

module.exports.followUser = function(req, res){
   var userId = req.body.userId;
   var fitnetworkerId = req.body.fitnetworkerId;

    Users.findById(fitnetworkerId, function(err, fitnetworker){
      fitnetworker.followers.push({userId: userId});
      fitnetworker.save();
      console.log("pushing followers");
    });

    Users.findById(userId, function(err, follower){
        follower.following.push({userId: fitnetworkerId})
        follower.save(function (err, saveResults) {
          if(err){
            console.log(err);
          }else {
                res.json(saveResults);
          }
        });
        console.log("pushing following");
    });
}

module.exports.unfollowUser = function(req, res){
   var userId = req.body.userId;
   var fitnetworkerId = req.body.fitnetworkerId;

    Users.findById(fitnetworkerId, function(err, fitnetworker){
      for(var i=0; i < fitnetworker.followers.length; i++)
      {
        if(fitnetworker.followers[i].userId === userId){
          fitnetworker.followers.pull(fitnetworker.followers[i]._id);
          fitnetworker.save();
          console.log("pulling followers");
        }
      }
      //fitnetworker.followers.pull({userId: userId});
      //fitnetworker.save();
    });

    Users.findById(userId, function(err, follower){
      for(var i=0; i < follower.following.length; i++)
      {
        if(follower.following[i].userId === fitnetworkerId){
          follower.following.pull(follower.following[i]._id);
          follower.save(function (err, saveResults) {
            if(err){
              console.log(err);
            }else {
                  res.json(saveResults);
            }
          });
          console.log("pulling following");
          break;
        }
      }
        //follower.following.pull({userId: fitnetworkerId});
        //follower.save();
    })
}
