(function(){
  var app = angular.module('FitnessNetwork');

  app.service('sessionService',['loggingService', function(loggingService){

    this.loadSessionData = function(sessionData){
      console.log("sessionService:loadSessionData(sessionData)");
      localStorage.setItem('User-Data', JSON.stringify(sessionData));
    }

    this.clearSessionData = function(){
      console.log("sessionService:clearSessionData()");
      localStorage.clear();
    }

    this.isUserLoggedIn = function(controllerName){
      var returnValue = (localStorage['User-Data'] !== undefined);

      if (controllerName){
        loggingService.log("sessionService:isUserLoggedIn(" + controllerName + ")" + " returnvalue:" + returnValue);
      //console.log("sessionService:isUserLoggedIn(" + controllerName + ")" + " returnvalue:" + returnValue);
      } else {
        loggingService.log("sessionService:isUserLoggedIn()" + " returnvalue:" + returnValue);
      //console.log("sessionService:isUserLoggedIn()" + " returnvalue:" + returnValue);
      }

      return returnValue;
    }
  }]);

}())
