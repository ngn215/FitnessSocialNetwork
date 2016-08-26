(function(){
  angular.module('FitnessNetwork')
    .controller('NavigationController',
    ['$scope', '$http', '$state', '$rootScope', 'sessionService',
    function($scope, $http, $state, $rootScope, sessionService){

      if (localStorage['User-Data']){
        $scope.loggedIn = true;
      }
      else {
        $scope.loggedIn = false;
      }

    $scope.logUserIn = function(){
      $http.post('api/user/login', $scope.login).success(function(response){
        //localStorage.setItem('User-Data', JSON.stringify(response));
        sessionService.loadSessionData(response);
        $scope.loggedIn = true;

        $rootScope.$broadcast('successfullLogIn');
      }).error(function(error){
        console.error(error);
        console.log("error");
      })
    };

    $scope.logOut = function(){
        localStorage.clear();
        $scope.loggedIn = false;
    };

  }])

}());
