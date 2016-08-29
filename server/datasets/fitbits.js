var mongoose = require('mongoose');
module.exports = mongoose.model('Fitbits', {
  user: String,
  userId: mongoose.Schema.ObjectId,
  userImage: String,
  content: String,
  date: {type: Date, default: Date.now}
})
