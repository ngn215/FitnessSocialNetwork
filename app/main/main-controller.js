(function (arguments) {
  angular.module('FitnessNetwork')
    .controller('MainController', ['$scope', '$http', '$interval', '$rootScope',
                          function ($scope, $http, $interval, $rootScope) {

          function loadUserData()
          {
            console.log("loadUserData()");
            $scope.user = JSON.parse(localStorage['User-Data']);
            console.log($scope.user);
          }

          function getFitbits (intial){
            console.log("getFitbits" + "(" + intial + ")");
            $http.get('api/fitbit/get').success(function (response) {
              if (intial) {
                $scope.fitbits = response;
                $rootScope.$broadcast('intialFitbitsRecd');
              } else {
                  if(response.length > $scope.fitbits.length){
                      $scope.incomingFitbits = response;
                  }
              }
            })
          };

          $scope.isUserLoggedIn = function(){
            if (localStorage['User-Data'] !== undefined){
              return true;
            }
            else {
              return false;
            }
          };

          $scope.$on('successfullLogIn', function(event) {
            console.log("successfullLogIn Event handler");
            loadUserData();
            getFitbits(true);
          })

          if ($scope.isUserLoggedIn())
          {
            console.log("inside if ($scope.isUserLoggedIn())");
            loadUserData();
            getFitbits(true);
          }

          $scope.sendFitbit = function(event){
                      if (event.which === 13) {
                        var request = {
                          user: $scope.user.username || $scope.user.email,
                          userId: $scope.user._id,
                          userImage: $scope.user.image,
                          content: $scope.newFitbit
                        }

                        $http.post('/api/fitbit/post', request)
                              .success(function (response) {
                                console.log(response);
                                $scope.fitbits = response;
                              }).error(function (error) {
                                console.error(error);
                              })
                      }
                    };

            $scope.$on('intialFitbitsRecd', function(event) {

                  $interval(function (arguments) {
                    if ($scope.isUserLoggedIn())
                    {
                      getFitbits(false);
                      if ($scope.incomingFitbits){
                      $scope.difference = $scope.incomingFitbits.length
                                          - $scope.fitbits.length;
                      }
                    //console.log("this is working");
                    }
                  }
                  , 5000);

              })

          /*
          $interval(function (arguments) {
            if (!$scope.isUserLoggedIn() && $scope.user)
            {
              console.log("performing cleanup");
              $scope.fitbits = undefined;
              $scope.incomingFitbits = undefined;
              $scope.user = undefined;
            }
          }
          , 5000)
          */

          $scope.setNewFitbits = function(){
            $scope.fitbits = angular.copy($scope.incomingFitbits);
            $scope.incomingFitbits = undefined;
          }

                }])
}())
