(function(){
  angular.module('FitnessNetwork')
    .controller('SignUpController', ['$scope', '$state', '$http',
    function($scope, $state, $http){

      function initializePage()
      {
        console.log("initializePage()");
        $scope.emailAddressAlreadyInUse = false;
        $scope.signUpSuccessfull = false;
      }

      initializePage();

      $scope.createUser = function(){

        if ($scope.signupForm.$valid)
        {
            console.log($scope.newUser);
            $http.post('api/user/getUsersData', $scope.newUser)
                  .success(function(response){
                    console.log(response);
                    if (!response.userExists)
                    {
                      console.log("user does not exist");
                      $scope.emailAddressAlreadyInUse = false;

                      $http.post('api/user/signup', $scope.newUser)
                      .success(function(response){
                          $scope.signUpSuccessfull = true;
                      })
                      .error(function(error){
                          $scope.signUpSuccessfull = false;
                      })
                    }
                    else
                    {
                      console.log("user already exists");
                      $scope.emailAddressAlreadyInUse = true;
                      $scope.signUpSuccessfull = false;
                    }
                  })
                  .error(function(error){
                      console.log(error);
                  })
        }
        else
        {
          $scope.signUpSuccessfull = false;
          console.log("form has errors");
        }
    }
    }])
}())
