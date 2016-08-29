var Fitbit = require('../datasets/fitbits');

module.exports.postFitbit = function(req, res){
  var fitbit = new Fitbit(req.body);
  fitbit.save(function(err){
      if(err){
        console.log(err);
      }
      else {
        return getAllFitbits(req, res);
      }
  });

}

module.exports.getFitbits = function(req, res){
  return getAllFitbits(req, res);
}

function getAllFitbits(req, res)
{
  var agg = Fitbit.aggregate();
   //console.log(req.url);
   //console.log(req.query.userId);
  agg.lookup(
        {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "UserInfo"
         }
      )
      //.unwind('UserInfo')
      .sort({date: -1})
      .exec(function (err, allFitbits) {
          if (err){
            //res.error(err);
            console.log(err);
          }else {
            //console.log(allFitbits);
            res.json(allFitbits);
          }
        })
}

// module.exports.getFitbits = function(req, res){
//   Fitbit.find({})
//         .sort({date: -1})
//         .exec(function (err, allFitbits) {
//           if (err){
//             res.error(err);
//           }else {
//             res.json(allFitbits);
//           }
//         })
// }
