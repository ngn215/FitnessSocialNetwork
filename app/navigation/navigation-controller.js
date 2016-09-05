(function(){
  angular.module('FitnessNetwork')
    .controller('NavigationController',
    ['$scope', '$http', '$state', '$rootScope', 'sessionService',
    function($scope, $http, $state, $rootScope, sessionService){

      $scope.controllerName = "NavigationController";
      $scope.loginFailed = false;

      if (sessionService.isUserLoggedIn($scope.controllerName)) {
        $scope.loggedIn = true;
      }
      else {
        $scope.loggedIn = false;
      }

    $scope.logUserIn = function(){
      $http.post('api/user/login', $scope.login).success(function(response){
        //localStorage.setItem('User-Data', JSON.stringify(response));
        console.log(response.loginstatus);
        if(response.loginstatus === "success")
        {
            console.log("login successfull");
            sessionService.loadSessionData(response);
            $scope.loggedIn = true;
            $scope.loginFailed = false;

            $rootScope.$broadcast('successfullLogIn');
        }
        else
        {
            console.log("login failed");
            $scope.loginFailed = true;
        }
      }).error(function(error){
        console.error(error);
        console.log("error");
      })
    };

    $scope.logOut = function(){
        sessionService.clearSessionData();
        // localStorage.clear();
        $scope.loggedIn = false;
        $rootScope.$broadcast('successfullLogOut');
    };

    // $scope.itemClicked = function () {
    //   $scope.class = "active";
    // }

  }])

}());
