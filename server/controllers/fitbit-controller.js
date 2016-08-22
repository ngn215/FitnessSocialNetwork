var Fitbit = require('../datasets/fitbits');

module.exports.postFitbit = function(req, res){
  var fitbit = new Fitbit(req.body);
  fitbit.save();

  Fitbit.find({})
        .sort({date: -1})
        .exec(function (err, allFitbits) {
    if (err) {
      res.error(err);
    } else {
      res.json(allFitbits);
    }
  })
}

module.exports.getFitbits = function(req, res){
  Fitbit.find({})
        .sort({date: -1})
        .exec(function (err, allFitbits) {
          if (err){
            res.error(err);
          }else {
            res.json(allFitbits);
          }
        })
}
