var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');
var fitbitController = require('./server/controllers/fitbit-controller');

mongoose.connect('mongodb://localhost:27017/fitnessnetwork');

app.use(bodyParser.json());
app.use(multipartMiddleware);
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));

app.get('/', function(req, res){
  res.sendfile('app/index.html');
})

//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//Profile
app.post('/api/profile/editPhoto', multipartMiddleware, profileController.updatePhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

//Fitbits
app.post('/api/fitbit/post', fitbitController.postFitbit);
app.get('/api/fitbit/get', fitbitController.getFitbits);

app.listen('8080', function(){
  console.log("Listening for localhost 8080");
});
