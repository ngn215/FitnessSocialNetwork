(function(){
  var app = angular.module('FitnessNetwork');

  app.service('sessionService', function(){

    this.loadSessionData = function(sessionData)
    {
      console.log("sessionService:loadSessionData(sessionData)");
      localStorage.setItem('User-Data', JSON.stringify(sessionData));
    }

    this.isUserLoggedIn = function(){
      console.log("sessionService:isUserLoggedIn()");
      if (localStorage['User-Data'] !== undefined){
        return true;
      } else {
        return false;
      }
    }
  })

}())
