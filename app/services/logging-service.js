(function(){
  var app = angular.module('FitnessNetwork');

  app.service('loggingService', [function(){

    this.log = function(text){
      // console.log(moment().format('MMDDYYYYhmmssa'));
      // var currentdate = new Date();
      // var datetime = (currentdate.getMonth("MM")+1)  + "/"
      //               + currentdate.getDate() + "/"
      //               + currentdate.getFullYear() + " "
      //               + currentdate.getHours() + ":"
      //               + currentdate.getMinutes() + ":"
      //               + currentdate.getSeconds()
      //               + currentdate.getMilliseconds();

      var datetime = moment().format('MMDDYYYY Hmmss SSS');
      console.log(datetime + " : " + text);
    }
  }])

}())
